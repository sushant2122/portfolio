import AboutSection from "../sections/about.section"
import CertificationSection from "../sections/cert.section"
import ContactSection from "../sections/contact.section"
import ExperienceSection from "../sections/experience.section"
import HeroSection from "../sections/hero.section"
import ProjectSection from "../sections/project.section"
import SkillSection from "../sections/skill.section"
import { Helmet } from "react-helmet-async";
function HomePage() {
    return (
        <>

            <Helmet>
                <title>Sushant Paudyal – Full Stack Developer Portfolio</title>

                <meta
                    name="description"
                    content="Sushant Paudyal is a Full Stack Developer from Nepal specializing in React, Node.js, and modern web applications. Explore projects, skills, and portfolio."
                />

                <meta name="author" content="Sushant Paudyal" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content="Sushant Paudyal | Full Stack Developer" />
                <meta
                    property="og:description"
                    content="Explore Sushant Paudyal’s portfolio featuring full stack projects, React apps, and modern web development skills."
                />
                <meta property="og:image" content="https://sushantpaudyal.info.np/prof.jpg" />
                <meta property="og:url" content="https://sushantpaudyal.info.np" />
                <meta property="og:type" content="website" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sushant Paudyal | Full Stack Developer" />
                <meta
                    name="twitter:description"
                    content="Full stack developer portfolio showcasing React, Node.js, and modern web projects."
                />
                <meta name="twitter:image" content="https://sushantpaudyal.info.np/prof.jpg" />

                {/* Canonical */}
                <link rel="canonical" href="https://sushantpaudyal.info.np" />
            </Helmet>
            <HeroSection />
            <AboutSection />
            <SkillSection />
            <ProjectSection />
            <ExperienceSection />
            <CertificationSection />
            <ContactSection />

        </>
    )
}

export default HomePage