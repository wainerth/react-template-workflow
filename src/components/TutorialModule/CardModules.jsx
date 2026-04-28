// -------------------------- imports -----------------------------------
import { Row, Col } from "react-bootstrap";

const CardModules = ({ cardData, handleOpenLessons }) => {
  const progress = Number(cardData.progreso) || 0;
  const cardBg = progress === 100 ? 'linear-gradient(160deg, #00b894 0%, #00796b 100%)' : progress === 0
    ? 'white'
    : 'linear-gradient(160deg, #1a6bff 0%, #0a3dbf 100%)';

  const getLevelColor = (tipoNombre) => {
    switch (tipoNombre) {
      case 'Indispensable':
        return '#e65100';
      case 'Intermedio':
        return '#00b894';
      case 'Avanzado':
        return '#1a6bff';
      default:
        return '#ccc';
    }
  };

 
  return (
    <div
      className="ay-card-v2 d-flex flex-column position-relative overflow-hidden rounded-4 p-4 shadow-sm h-100 text-white"
      style={{ background: cardBg }}
    >
      {/* Número de fondo */}
      <span
        className={`position-absolute bottom-0 end-0 pe-2 ay-card-v2-bg-number${cardData.progreso === 0 ? ' ay-card-v2-bg-number--dim' : ''
          }`}
      >
        {cardData.orden ? `0${cardData.orden}` : '01'}
      </span>

      {/* Fila superior: nivel + ícono */}
      <div className="d-flex align-items-center justify-content-between mb-3 position-relative z-1">
        <span
          className="ay-level-badge d-inline-flex align-items-center gap-2"
          style={{ backgroundColor: getLevelColor(cardData.tipo_nombre) }}
        >
          <span className="rounded-circle d-inline-block" style={{ width: 6, height: 6, background: 'rgba(255,255,255,0.7)' }} />
          {cardData.tipo_nombre}
        </span>
        <span className="ay-icon d-block mb-4">{cardData.categoria_icono}</span>
      </div>

      {/* Título */}
      <h2
        className={`ay-title position-relative z-1 mb-3${cardData.progreso === 0 ? ' ay-title--dark' : ''
          }`}
   
      >
        {cardData.nombre.split(' ').slice(0, -1).join(' ')}{' '}
        <em>{cardData.nombre.split(' ').slice(-1)}</em>
      </h2>

      {/* Descripción */}
      <p
        className={`ay-body position-relative z-1${cardData.progreso === 0 ? ' text-secondary' : ''
          }`}
        style={{ fontSize: 14 }}
      >
        {cardData.descripcion}
      </p>

      {/* Stats row */}
      <Row className="g-3 mb-3 position-relative z-1">
        <Col xs={6} className="d-flex align-items-center gap-2">
          <div className="ay-stat-icon d-flex align-items-center justify-content-center">📚</div>
          <div>
            <div className={`ay-stat-value fw-bold ${cardData.progreso !== 0 ? 'text-white' : 'text-black'}`}>
              {cardData.total_videos} clases
            </div>
            <div className={`ay-stat-label ${cardData.progreso !== 0 ? 'text-white' : 'text-black'}`}>Módulo</div>
          </div>
        </Col>
        <Col xs={6} className="d-flex align-items-center gap-2">
          <div className="ay-stat-icon d-flex align-items-center justify-content-center">⏱️</div>
          <div>
            <div className={`ay-stat-value fw-bold ${cardData.progreso !== 0 ? 'text-white' : 'text-black'}`}>
              {cardData.duracion}
            </div>
            <div className={`ay-stat-label ${cardData.progreso !== 0 ? 'text-white' : 'text-black'}`}>Duración</div>
          </div>
        </Col>
      </Row>

      {/* Divisor */}
      <div className={`ay-divider mb-3 position-relative z-1 ${cardData.progreso === 0 ? 'bg-secondary' : ''}`} />

      {/* Progreso */}
      <div className="position-relative z-1 mb-3">
        <Row className="align-items-center mb-2">
          <Col xs="auto">
            <span className={`text-uppercase small fw-semibold ${cardData.progreso === 0 ? 'text-secondary' : 'text-white-50'}`}>
              Progreso
            </span>
          </Col>
          <Col className="text-end">
            <span className="ay-progress-pct">{cardData.progreso || 0}% completado</span>
          </Col>
        </Row>
        <div
          className="ay-progress-track"
          style={cardData.progreso === 0 ? { border: '1px solid #80808036', backgroundColor: '#8080801f' } : { background: 'rgba(255,255,255,0.15)' }}
        >
          <div className="ay-progress-fill" style={{ width: `${cardData.progreso || 0}%` }} />
        </div>
      </div>

      {/* Tags */}
      <div className="d-flex flex-wrap gap-2 mb-3 position-relative z-1">
        {Array.isArray(cardData.categorias) ? (
          cardData.categorias.map((categoria, index) => (
            <span
              key={index}
              className="badge bg-light text-muted rounded-pill border"
              style={{ fontSize: 11, padding: '4px 11px' }}
            >
              {categoria}
            </span>
          ))
        ) : (
          <span
            className="badge bg-light text-muted rounded-pill border"
            style={{ fontSize: 11, padding: '4px 11px' }}
          >
            {cardData.categoria_nombre || cardData.categorias || 'Sin categoría'}
          </span>
        )}
      </div>

      {/* CTA */}
      <button
        className="ay-cta-btn d-flex align-items-center justify-content-between w-100 rounded-3 py-2 px-3 mt-auto position-relative z-1 border-0 text-white"
        style={
          cardData.progreso === 0
            ? { background: 'linear-gradient(90deg, #1a6bff, #00c9a771)' }
            : {}
        }
        onClick={() => handleOpenLessons(cardData.id)}
      >
        <span>{cardData.progreso < 100 ? 'Ver tutoriales' : 'Ver Certificado'}</span>
        <span className="ay-cta-arrow d-flex align-items-center justify-content-center">
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default CardModules;