import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EventNotFound from './EventNotFound';

const Event = ({ event, onDelete }) => {
  if (!event) return <EventNotFound />;

  return (
  <div className="eventContainer">
    <h2>
      {event.event_type}
      {' ('}
      {event.event_date}
      {') '}
      <Link to={`/events/${event.id}/edit`}>Editar</Link>
      <button className="delete" type="button" onClick={() => onDelete(event.id)}>
       Eliminar
      </button>
    </h2>
    <ul>
      <li>
        <strong>Nombre:</strong>
        {' '}
        {event.event_type}
      </li>
      <li>
        <strong>Fecha de visita:</strong>
        {' '}
        {event.event_date}
      </li>
      <li>
        <strong>Descripción:</strong>
        {' '}
        {event.title}
      </li>
      <li>
        <strong>Página web:</strong>
        {' '}
        <Link to={{ pathname: event.speaker }} target="_blank" >{event.speaker}</Link>
      </li>
      <li>
        <strong>Puntuación:</strong>
        {' '}
        {event.host}
        </li>
    </ul>
  </div>
 );
};

    

Event.propTypes = {
  event: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};

Event.defaultProps = {
  event: undefined,
};


export default Event;

