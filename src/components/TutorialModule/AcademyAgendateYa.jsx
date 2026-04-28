// ------------------------- hooks -----------------------------------
import { useState, useEffect } from "react";
// -------------------------- components -----------------------------------
import LessonsAgendateYa from "./LessonsAgendateYa"
import CardsSectionTutorialModules from "./CardsSectionModules";
import SkeletonCard from "../ModulesSkeleton/SkeletonCard";
import LessonsAgendateYaSkeleton from "../ModulesSkeleton/SkeletonLessons";
// -------------------------- styles -----------------------------------
import "./Styles/AcademyAgendateYa.css";
// -------------------------- others -----------------------------------
import { Container, Row, Col } from "react-bootstrap";
import BannerModulos from "../../img/BannerModulos.png"
// -------------------------- apollo -----------------------------------
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { GET_ALL_MODULES, GET_LESSONS_BY_MODULE } from "../../services/queries";


export default function AcademyAgendateYa() {

    // ------------------------------------------------------- hooks ---------------------------------------------------------
    const [showLessons, setShowLessons] = useState(false);
    const [moduleLessons, setModuleLessons] = useState([]);
    const [lessonsLoading, setLessonsLoading] = useState(false);
    const [lessonsError, setLessonsError] = useState(null);


    // -------------------------------------------------------- data ---------------------------------------------------------
    const CARDS = [
        {
            id: '1',
            icon: "🚀",
            level: "Indispensable",
            levelColor: "#e65100",
            cardBg: "linear-gradient(160deg, #00b894 0%, #00796b 100%)",
            tags: ["Primeros pasos", "Setup rápido"],
            title: "Pon tu negocio en marcha hoy mismo",
            desc: "Registra tu comercio, crea profesionales, servicios y cupones de descuento en minutos. Todo lo esencial para empezar a recibir clientes sin perder tiempo.",
            featured: true,
            courseDescription:
                "Descubre cómo dejar tu perfil comercial impecable: registra tu negocio, añade a tu equipo de profesionales, configura los servicios que ofreces y activa cupones para atraer más clientes. Una base sólida para vender más cada día.",
            youtubeVideoId: "boABlm9PphI",
            totalLessons: 8,
            duration: "45 min",
            progress: 100,
            lessons: [
                { id: 1, title: "🚀 Registra tu comercio en 3 pasos", youtubeVideoId: "boABlm9PphI" },
                { id: 2, title: "👥 Cómo crear y gestionar profesionales", youtubeVideoId: "boABlm9PphI" },
                { id: 3, title: "👤 Crea usuarios para tu equipo", youtubeVideoId: "boABlm9PphI" },
                { id: 4, title: "💇‍♀️ Cómo dar de alta tus servicios (y que se vendan solos)", youtubeVideoId: "boABlm9PphI" },
                { id: 5, title: "🎟️ Cupones de descuento: atrae más clientes sin bajar precios", youtubeVideoId: "boABlm9PphI" },
                { id: 6, title: "📋 Fichas personalizadas: recopila la info que realmente necesitas", youtubeVideoId: "boABlm9PphI" },
                { id: 7, title: "⚙️ Ajustes de agenda que disparan tu ocupación", youtubeVideoId: "boABlm9PphI" },
                { id: 8, title: "🔔 Recordatorios automáticos: di adiós a las ausencias", youtubeVideoId: "boABlm9PphI" },
                { id: 9, title: "💬 Mensajes de WhatsApp que convierten", youtubeVideoId: "boABlm9PphI" },
                { id: 10, title: "💰 Controla tu caja y comisiones sin errores", youtubeVideoId: "boABlm9PphI" },
            ],
        },
        {
            id: '2',
            icon: "🤖",
            level: "Intermedio",
            levelColor: "#00b894",
            cardBg: "linear-gradient(160deg, #1a6bff 0%, #0a3dbf 100%)",
            category: "Guía rápida",
            year: "2024",
            tags: ["Automatización", "WhatsApp", "Fidelización"],
            title: "Automatiza y olvídate de las ausencias",
            desc: "Activa recordatorios inteligentes por WhatsApp y email. Reduce las cancelaciones y mantén tu agenda siempre llena, incluso mientras duermes.",
            featured: true,
            courseDescription:
                "El secreto de los negocios más rentables: la automatización. Aprende a configurar notificaciones automáticas para que tus clientes nunca olviden una cita y aumentes tu tasa de asistencia hasta en un 60%.",
            totalLessons: 12,
            duration: "70 min",
            progress: 60,
            lessons: [
                { id: 11, title: "🤖 Automatización 101: por qué tu negocio la necesita", youtubeVideoId: "boABlm9PphI" },
                { id: 12, title: "⏰ Crea recordatorios que realmente funcionan", youtubeVideoId: "boABlm9PphI" },
            ],
        },
        {
            id: '3',
            icon: "📈",
            level: "Avanzado",
            levelColor: "#1a6bff",
            cardBg: "white",
            category: "Reportes",
            year: "2024",
            tags: ["Analytics", "Crecimiento", "Métricas"],
            title: "Convierte datos en decisiones que multiplican ganancias",
            desc: "Descubre qué servicios venden más, cuáles son tus horas pico y cómo retener clientes. Toma el control con reportes claros y accionables.",
            featured: false,
            courseDescription:
                "Deja de volar a ciegas. Con los reportes de Agendate Ya sabrás exactamente qué está funcionando y dónde hay oportunidades para crecer. Ocupación, ingresos, retención... todo en un solo panel.",
            totalLessons: 10,
            duration: "55 min",
            progress: 0,
            lessons: [
                { id: 13, title: "📊 Panel de reportes: tu centro de mando", youtubeVideoId: "boABlm9PphI" },
                { id: 14, title: "🔍 Interpreta tus métricas y toma mejores decisiones", youtubeVideoId: "boABlm9PphI" },
            ],
        },
    ];

    // ----------------------------------------------------------------------- data fetching ---------------------------------------------------------
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const { loading, error, data: getAllModules, refetch } = useQuery(GET_ALL_MODULES, {
        variables: { userId: "110", categoriaId: null },
    });

    const [getLessonsByModule, { loading: lessonsQueryLoading, error: lessonsQueryError }] = useLazyQuery(GET_LESSONS_BY_MODULE);

    const modulesData = getAllModules?.obtenerModulos?.data || [];

    const handleCategoryChange = (categoriaId) => {
        setSelectedCategoryId(categoriaId);
        refetch({ userId: "110", categoriaId });
    };


    // ------------------------------------------------------- functions ---------------------------------------------------------
    const handleOpenLessons = async (moduleId) => {
        setLessonsLoading(true);
        setLessonsError(null);

        try {
            const result = await getLessonsByModule({
                variables: {
                    moduloId: moduleId,
                    userId: "110"
                }
            });
            const lessons = result.data?.obtenerVideo?.data || [];
            setModuleLessons(lessons);
        } catch (err) {
            setLessonsError(err.message);
        } finally {
            setLessonsLoading(false);
        }

        setShowLessons(true);
    }

    // ------------------------------------------------------- effects ---------------------------------------------------------

    // scroll al top cuando se muestran las lecciones
    useEffect(() => {
        if (showLessons) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [showLessons]);

    return (
        <div className="ay-app bg-light">
            {!showLessons ? (
                <>
                    {/* HERO */}
                    <section
                        className="position-relative overflow-hidden d-flex flex-column justify-content-center py-5"
                        style={{ minHeight: "70vh" }}
                    >
                        {/* Capa de fondo */}
                        <div className="position-absolute top-0 start-0 w-100 h-100 ay-hero-bg" />
                        {/* Rejilla */}
                        <div className="position-absolute top-0 start-0 w-100 h-100 ay-hero-grid" />

                        <Container>
                            <Row className="align-items-center g-5">
                                <Col xs={12} sm={6} >
                                    <div className="position-relative" style={{ zIndex: 1 }}>
                                        <h1 className="fw-bold ay-hero-title mb-4">
                                            Impulsa tu negocio <br />
                                            con la <span style={{ color: '#0d6efd' }}>Academia</span> <br />
                                            <em className="position-relative">Agéndate ¡Ya!</em>
                                        </h1>
                                        <p className="ay-description text-secondary mb-4" style={{ maxWidth: "480px" }}>
                                            Domina todas las herramientas y estrategias que te ayudarán a
                                            gestionar mejor tu tiempo, atraer más clientes y aumentar tus
                                            ingresos.
                                        </p>
                                    </div>
                                </Col>

                                <Col
                                    xs={12}
                                    sm={6}
                                   
                                    className="d-flex justify-content-center"
                                >
                                    <img src={BannerModulos} alt="" className="img-fluid z-1 shadow-lg " />
                                </Col>
                            </Row>
                        </Container>
                        <div className="lsa-divisor">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1920 78"
                                preserveAspectRatio="none"
                            >
                                <path d="M534.671 0.907555L47.3735 26.5409C20.8166 27.9379 0 49.8783 0 76.4718V78H1920V76.4721C1920 49.8785 1899.18 27.938 1872.63 26.5411L1391.48 1.23387C1351.04 -0.893562 1310.64 6.30416 1273.42 22.2711C1228.82 41.4035 1180.79 51.2693 1132.26 51.2693H766.834C722.819 51.2693 679.376 41.3046 639.761 22.1223C607.082 6.29829 570.93 -0.999779 534.671 0.907555Z" />
                            </svg>
                        </div>
                    </section>

                    {loading ? (
                        <SkeletonCard />
                    ) : (
                        <CardsSectionTutorialModules
                            cardsData={modulesData}
                            handleOpenLessons={handleOpenLessons}
                            onCategoryChange={handleCategoryChange}
                            activeCategoryId={selectedCategoryId}
                        />
                    )}
                </>
            ) : (
                lessonsLoading ? (
                    <LessonsAgendateYaSkeleton cardCount={3} />
                ) : (
                    <LessonsAgendateYa
                        lessons={moduleLessons}
                        loading={lessonsQueryLoading}
                        onBack={() => {
                            setShowLessons(false);
                            setModuleLessons([]);
                            setLessonsError(null);
                            refetch();
                        }}
                    />
                )
            )}
        </div>
    );
}


