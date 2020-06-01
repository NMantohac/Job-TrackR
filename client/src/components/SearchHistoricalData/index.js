import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Message, Button, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import axios from 'axios';
import { GET_HISTORICAL_DATA, GET_HISTORICAL_DATA_ERROR } from '../../actions/types';

class SearchHistoricalData extends Component {
  state = {
    loading: false,
    searchError: false,
  }

  // When the user submits the form, send the formValues to /api/trending/historical
  onSubmit = async (formValues, dispatch) => {
    const { statenameh, jobcategoryh } = formValues;
    const jobcategory1 = `${jobcategoryh}-jobs`;
    try {
      this.setState({ loading: true });
      const { data } = await axios.get(`/api/trending/historical?statenameh=${statenameh}&jobcategoryh=${jobcategory1}`);
      dispatch({ type: GET_HISTORICAL_DATA, payload: data });
      this.setState({ loading: false });
      if (Object.keys(this.props.historical).length === 0) {
        this.setState({ searchError: true });
      } else {
        this.setState({ searchError: false });
      }
      this.scrollToChart();
    } catch (e) {
      dispatch({ type: GET_HISTORICAL_DATA_ERROR, payload: e });
    }
  }

  scrollToChart = () => {
    if (!document.querySelector('.employer-chart') && !document.querySelector('.regional-chart')) {
      window.scrollTo(0, document.querySelector('.historical-chart').scrollHeight);
    } else {
      const chart = document.querySelector('.historical-chart');
      const offset = 40;
      const chartPosition = chart.getBoundingClientRect().top;
      const offsetPosition = chartPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

  renderHistoricalData = ({ input, meta, placeholder }) => {
    return (
      <>
        <Form.Input
          {...input}
          size="large"
          error={meta.touched && meta.error}
          icon="search"
          iconPosition="left"
          autoComplete="off"
          placeholder={placeholder}
        />
      </>
    );
  }

  renderError = () => {
    if (this.state.searchError) {
      return (
        <Message
          size="small"
          icon="x"
          negative
          onDismiss={this.handleDismiss}
          header="Failed to find result!"
          content="Please try again by searching something different"
        />
      );
    } else {
      return null;
    }
  }

  render() {
    const { handleSubmit, submitting, submitFailed } = this.props;
    return (
      <div>
        <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
          <Segment stacked>
            <h3 style={{ fontSize: '16px' }}> This returns salary and vacancy data for six months for job categories in any state.</h3>
            <Field
              name="jobcategoryh"
              placeholder="Enter job vategory e.g IT"
              component={this.renderHistoricalData}
              validate={
                    [
                      required({ msg: 'Job category is required' }),
                    ]
                  }
            />
            <Field
              name="statenameh"
              placeholder="Enter state e.g california"
              component={this.renderHistoricalData}
              validate={
                    [
                      required({ msg: 'State is required' }),
                    ]
                  }
            />
            <Button
              loading={this.state.loading}
              color="brown"
              size="large"
              type="submit"
              disabled={submitting || submitFailed}
            >
              <Icon name="search" />
              Search Historical Data
            </Button>
            { this.state.searchError ? this.renderError() : null }
          </Segment>
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: 'SearchHistoricalData ' })(SearchHistoricalData);
