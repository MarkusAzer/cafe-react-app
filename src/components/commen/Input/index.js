import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import styles from './style';

const InputComponent = ({
  formikProps,
  classes,
  label,
  name,
  required,
  fullWidth,
  maxInputWidth,
  buttonType,
  options,
  uploadOnBackground,
}) => {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } = formikProps;
  const inputWidth = maxInputWidth ? 12 : fullWidth ? 9 : 5; // eslint-disable-line no-nested-ternary

  return (
    <Grid className={classes.root} container>
      <Grid justify="center" md={inputWidth} xs={12} item container>
        <FormControl variant="filled" fullWidth error={touched[name] && errors[name]}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {buttonType === 'file' ? (
            // TODO: Show thumb
            <div>
              <input
                id="contained-button-file"
                name={name}
                onChange={event => {
                  const file = event.currentTarget.files[0];
                  uploadOnBackground(file).then(url => {
                    setFieldValue('photo', url);
                    handleChange();
                  });
                }}
                accept="image/*"
                className={classes.hiddenInput}
                multiple
                type="file"
                onBlur={handleBlur}
                aria-describedby="input-error-text"
                required={required}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  component="span"
                  className={classes.uploadButton}
                >
                  Choose Photo
                </Button>
              </label>
            </div>
          ) : buttonType === 'select' ? (
            <TextField
              id={`input-${name}`}
              fullWidth
              select
              label={name}
              className={classes.input}
              value={values[name] || ''}
              onChange={handleChange(name)}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText={`Please select ${name}`}
              variant="outlined"
              margin="normal"
              required={required}
            >
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <>
              <InputLabel htmlFor={`input-${name}`}>{label}</InputLabel>
              <TextField
                id={`input-${name}`}
                name={name}
                fullWidth
                value={values[name] || ''}
                onChange={handleChange}
                type={buttonType}
                onBlur={handleBlur}
                className={classes.input}
                margin="normal"
                variant="outlined"
                aria-describedby="input-error-text"
                required={required}
              />
            </>
          )}

          <FormHelperText className={classes.helperText} id="input-error-text">
            {touched[name] && errors[name]}
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

InputComponent.propTypes = {
  formikProps: PropTypes.object.isRequired, //eslint-disable-line
  classes: PropTypes.object.isRequired, //eslint-disable-line
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  maxInputWidth: PropTypes.bool,
  buttonType: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  uploadOnBackground: PropTypes.func,
};

InputComponent.defaultProps = {
  required: false,
  fullWidth: false,
  maxInputWidth: false,
  buttonType: 'input',
  options: [],
  uploadOnBackground: undefined,
};

export default withStyles(styles, { withTheme: true })(InputComponent);
