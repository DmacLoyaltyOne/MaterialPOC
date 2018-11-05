import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { FormControl, InputLabel, OutlinedInput, InputBase } from '@material-ui/core'
import * as contentful from 'contentful'
import Course from './Course'
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import ReactDOM from 'react-dom'

const SPACE_ID = '27fdva85d4gv'
const ACCESS_TOKEN = 'e7b6465c296a325ca697fcddc9a24b38ce510b19396b45643dad65a8a10fdda4'

const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})



const styles = (theme: Theme) => createStyles({
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 0,

    backgroundColor: '#f9e8f1',
    border: '1px solid #f9e8f1',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      outline: '#d30e8b solid 2px;',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  }
})

interface IProps {
  classes: any
}

class CourseList extends Component<IProps, any> {
    state = {
      courses: [],
        searchString: '',
        name: 'test'
    }

    labelRef: any = null

    constructor(props) {
        super(props)
        this.getCourses()
    }

    handleChange = event => {
      this.setState({ name: event.target.value })
    };


    getCourses = () => {
        client.getEntries({
            content_type: 'course',
            query: this.state.searchString
        })
        .then((response) => {
            this.setState({courses: response.items})
        })
        .catch((error) => {
            console.log("Error occured while fetching data")
            console.log(error)
        })
    }

    onSearchInputChange = (event) => {
        if (event.target.value) {
            this.setState({searchString: event.target.value})
        } else {
            this.setState({searchString: ''})
        }
        this.getCourses()
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                {this.state.courses ? (
                    <div>
                        <FormControl className={classes.margin}>
                          <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                            Bootstrap
                          </InputLabel>
                          <InputBase
                            id="bootstrap-input"
                            defaultValue="react-bootstrap"
                            classes={{
                              root: classes.bootstrapRoot,
                              input: classes.bootstrapInput,
                            }}
                          />
                        </FormControl>

                        <Grid container spacing={24} style={{padding: 24}}>
                            { this.state.courses.map(currentCourse => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Course course={currentCourse} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No courses found" }
            </div>
        )
    }
}
export default withStyles(styles)(CourseList);