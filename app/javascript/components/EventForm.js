import React from 'react';
import PropTypes from 'prop-types';
import { isEmptyObject, validateEvent } from '../helpers/helpers';
import { Link } from 'react-router-dom';
import EventNotFound from './EventNotFound';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        event: props.event,
        errors: {},
      };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { event } = this.state;
    const errors = validateEvent(event);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(event);
    }  
  }

  handleInputChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.updateEvent(name, value);
  }

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  updateEvent(key, value) {
    this.setState(prevState => ({
      event: {
        ...prevState.event,
        [key]: value,
      },
    }));
  }

  componentWillReceiveProps({ event }) {
    this.setState({ event });
  }

  render() {
    const { event } = this.state;
    const { path } = this.props;

    if (!event.id && path === '/events/:id/edit') return <EventNotFound />
    
    const cancelURL = event.id ? `/events/${event.id}` : '/events';
    const title = event.id ? `${event.event_date} - ${event.event_type}` : 'Nuevo Restaurante';

    return (
      <div>
        <h2>{event.event_type}</h2>

        {this.renderErrors()}

        <form className="eventForm" onSubmit={this.handleSubmit}>

          <div>
            <label htmlFor="event_type">
              <strong>Nombre:</strong>
              <input
                type="text"
                id="event_type"
                name="event_type"
                onChange={this.handleInputChange}
                value={event.event_type}
              />
            </label>
          </div>
          <div>
            <label htmlFor="event_date">
              <strong>Fecha de visita (aaaa-mm-dd):</strong>
              <input
                type="text"
                id="event_date"
                name="event_date"
                value={event.event_date}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="title">
              <strong>Descripción:</strong>
              <textarea
                cols="30"
                rows="10"
                id="title"
                name="title"
                onChange={this.handleInputChange}
                value={event.title}
              />
            </label>
          </div>
          <div>
            <label htmlFor="speaker">
              <strong>Página web:</strong>
              <input 
                type="text" 
                id="speaker" 
                name="speaker" 
                onChange={this.handleInputChange}
                value={event.speaker}
                />
            </label>
          </div>
          <div>
            <label htmlFor="host">
              <strong>Puntuación:</strong>
              <input 
                type="text" 
                id="host" 
                name="host" 
                onChange={this.handleInputChange}
                value={event.host}
               />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Guardar</button>
            <Link to={cancelURL}>Cancelar</Link>
          </div>
        </form>
      </div>
    );
  }
}

EventForm.propTypes = {
  event: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
};

EventForm.defaultProps = {
  event: {
    event_type: '',
    event_date: '',
    title: '',
    speaker: '',
    host: '',
  },
};


export default EventForm;