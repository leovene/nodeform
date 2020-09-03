import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Octokit } from '@octokit/core';
import './Search.css';


class Search extends Component {
    constructor() {
        super();
        this.state = {
            found: false,
            title: "",
            body: "",
            labels: "",
            open: false,
            page: 1,
            issues: []
        }
    }

    handleChange = name => event => {
        if (name === "open") {
            this.setState({
                [name]: !this.state.open,
            });
        } else {
            this.setState({
                [name]: event.target.value,
            });
        }
    };

    found = () => {
        this.setState({
            found: true,
        });
    };

    searchIssues = async () => {

        this.setState({
            found: false
        });
          
        const { data } = await octokit.request("/repos/facebook/react/issues", {
            state: this.state.open ? "open" : "all",
            labels: this.state.labels,
            page: this.state.page
        });

        this.setState({
            found: data ? true : false,
            issues: data.filter(issue => issue.title.includes(this.state.title) && issue.body.includes(this.state.body))
        });
    };

    render() {
        return (
            <div>
                <form className="formSearch" noValidate autoComplete="on">
                    <span className="textField"><TextField id="title" label="Title" value={this.state.description} margin="normal" onChange={this.handleChange('title')} /></span>
                    <span className="textField"><TextField id="body" label="Body" value={this.state.location} margin="normal" onChange={this.handleChange('body')}/></span>
                    <span className="textField"><TextField id="labels" label="Labels" value={this.state.labels} margin="normal" onChange={this.handleChange('labels')}/></span>
                    <span className="checkBox">Open<Checkbox checked={this.state.open} onChange={this.handleChange('open')}/></span>
                    <Button className="buttonSearch" variant="contained" color="primary" size="large" page="1" onClick={this.searchIssues}>
                        Search
                    </Button>
                </form>
                <div className={this.state.found ? '' : 'hidden'}>
                    <Card className="cardResult">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom variant="h5" component="h2">
                                Issues
                            </Typography>
                            <List component="nav" className="listIssues">
                                {
                                    this.state.issues.map((issue) => {
                                        return <div key={issue.id}>
                                            <ListItem>
                                                <ListItemText primary={issue.title} secondary={issue.created_at} />
                                            </ListItem>
                                            <Divider />
                                        </div>
                                    })
                                }
                            </List>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Search;
