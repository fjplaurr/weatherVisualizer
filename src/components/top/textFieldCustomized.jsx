import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Search } from "@material-ui/icons"
import { IconButton } from '@material-ui/core';

const styles = {
    persStyle: {
        width: '60%',
        '& .MuiOutlinedInput-adornedEnd': {
            padding: '0px'
        },
        '& label.Mui-focused': {
            color: '#e9e9e9',
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
            '& fieldset': {
                borderColor: '#e9e9e9',
            },
            '& .MuiInputAdornment-root .MuiIconButton-root': {
                color: '#e9e9e9'
            },
            '& input': {
                color: '#e9e9e9',
            }
        },
        '& label': {
            color: 'rgba(255,255,255,0.4)',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(255,255,255,0.4)',
            },
            '& .MuiInputAdornment-root .MuiIconButton-root': {
                color: 'rgba(255,255,255,0.4)'
            },
            '& input': {
                color: 'rgba(255,255,255,0.4)',
            }
        },
    }
};

function CustomizedInputs(props) {
    const { classes, onLocationNameChange, onSelectCity, cityName } = props;
    return (
        <TextField
            onChange={onLocationNameChange}
            value={cityName}
            type="search"
            label="Select city"
            variant="outlined"
            className={classes.persStyle}
            InputProps={
                {
                    endAdornment: (
                        <InputAdornment >
                            <IconButton disableTouchRipple>
                                <Search onClick={onSelectCity} ></Search>
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }
        ></TextField>
    );
}

CustomizedInputs.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedInputs);
