// ------------------------- hooks -----------------------------------
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
// -------------------------- components -----------------------------------
import CardModules from './CardModules';

// -------------------------- styles -----------------------------------
import "./Styles/CardsSectionsModules.css"
// -------------------------- others -----------------------------------  
import { Container, Row, Col } from 'react-bootstrap';
import { GET_CATEGORIES } from '../../services/queries';



const CardsSectionTutorialModules = ({ cardsData, handleOpenLessons, onCategoryChange, activeCategoryId }) => {
  console.log(cardsData)
  const [active, setActive] = useState(activeCategoryId == null ? 'all' : String(activeCategoryId));

  const { data: categoriesData } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    setActive(activeCategoryId == null ? 'all' : String(activeCategoryId));
  }, [activeCategoryId]);

  const FILTERS = [
    { id: 'all', label: 'Todos', value: null },
    ...(categoriesData?.obtenerCategorias?.data || []).map((cat) => ({
      id: String(cat.id),
      label: cat.nombre,
      value: cat.id,
      icon: cat.categoria_icono,
    })),
  ];

  return (
    <>
      
      <div style={{ background: "#e0e7f2" }}>

        <Container>
          <section className="py-5 pt-0">
            {/* Filter Bar */}
            <div className="mb-5">
              <div className="d-flex align-items-center gap-3 bg-white border rounded-4 px-3 py-2 flex-wrap shadow-sm">
                <span className="text-uppercase fw-semibold text-muted small border-end pe-2 me-1">
                  Filtrar por
                </span>
                <div className="d-flex gap-2 flex-wrap flex-fill">
                  {FILTERS.map(f => (
                    <button
                      key={f.id}
                      className={`btn rounded-pill ay-filter-pill d-inline-flex align-items-center gap-2${active === f.id ? ' ay-filter-pill--active' : ''
                        }`}
                      onClick={() => {
                        setActive(f.id);
                        onCategoryChange?.(f.value);
                      }}
                    >
                      {f.icon && <span className="fs-6">{f.icon}</span>}
                      {f.label}
                      {active === f.id && <span className="ay-filter-dot d-inline-block" />}
                    </button>
                  ))}
                </div>
                <div className="ms-auto small text-muted">
                  <span className="fw-bold text-primary">{cardsData.length}</span> módulo{cardsData.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {/* Grid */}
            <Row className="g-4 ">
              {cardsData.map((card, index) => (
                <Col
                  key={index}
                  xs={12}
                  sm={6}
                  lg={4}

                  style={{
                    animation: `fadeUp 0.35s ease both`,
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  <CardModules cardData={card} handleOpenLessons={handleOpenLessons} />
                </Col>
              ))}
            </Row>
          </section>
        </Container>
      </div>
    </>

  );
};

export default CardsSectionTutorialModules;