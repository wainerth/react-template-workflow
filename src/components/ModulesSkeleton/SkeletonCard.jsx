import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Styles/CardsSectionSkeleton.css"

const SkeletonFilterPill = () => (
  <div className="skeleton-pill shimmer" />
);

const SkeletonCard = () => (
  <div className="ay-card-v2 skeleton-card p-4 rounded-4">
    {/* Badge de nivel */}
    <div className="d-flex justify-content-between align-items-start mb-3">
      <div className="skeleton-badge shimmer" />
      <div className="skeleton-icon shimmer rounded-circle" />
    </div>

    {/* Título */}
    <div className="skeleton-line w-75 mb-2 shimmer" style={{ height: 22 }} />
    <div className="skeleton-line w-50 mb-3 shimmer" style={{ height: 22 }} />

    {/* Cuerpo de texto */}
    <div className="skeleton-line w-100 mb-3 shimmer" style={{ height: 14 }} />
    <div className="skeleton-line w-80 mb-3 shimmer" style={{ height: 14 }} />
    <div className="skeleton-line w-60 mb-4 shimmer" style={{ height: 14 }} />

    {/* Stats */}
    <div className="d-flex gap-3 mb-3">
      <div className="skeleton-stat shimmer" />
      <div className="skeleton-stat shimmer" />
    </div>

    <div className="skeleton-divider mb-4 shimmer" />

    {/* Progreso */}
    <div className="d-flex align-items-center gap-2 mb-4">
      <div className="skeleton-progress shimmer flex-grow-1" />
      <div className="skeleton-pct shimmer" style={{ width: 45, height: 24 }} />
    </div>

    {/* CTA */}
    <div className="d-flex justify-content-between align-items-center">
      <div className="skeleton-line w-40 shimmer" style={{ height: 16 }} />
      <div className="skeleton-arrow shimmer rounded-3" />
    </div>
  </div>
);

const CardsSectionTutorialModulesSkeleton = () => {
  return (
    <div style={{ background: "#e0e7f2" }}>

      <Container>
        <section className="py-5">
          {/* Skeleton Filter Bar */}
          <div className="mb-5">
            <div className="d-flex align-items-center gap-3 bg-white border rounded-4 px-3 py-2 flex-wrap shadow-sm">
              <div className="skeleton-line shimmer" style={{ width: 70, height: 12 }} />
              <div className="d-flex gap-2 flex-wrap flex-fill">
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonFilterPill key={i} />
                ))}
              </div>
              <div className="ms-auto d-flex align-items-center gap-2">
                <div className="skeleton-line shimmer" style={{ width: 40, height: 12 }} />
              </div>
            </div>
          </div>

          {/* Skeleton Grid */}
          <Row className="g-4">
            {[1, 2, 3].map((i) => (
              <Col md={4} key={i}>
                <SkeletonCard />
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </div>

  );
};

export default CardsSectionTutorialModulesSkeleton;