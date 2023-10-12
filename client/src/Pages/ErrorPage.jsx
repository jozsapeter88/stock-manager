import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const ErrorComponent = ({ error }) => (
  <Alert variant="danger">
    <Alert.Heading>Oh snap! Something went wrong.</Alert.Heading>
    <p>
      {error.message}
    </p>
  </Alert>
);

ErrorComponent.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};

export default ErrorComponent;

