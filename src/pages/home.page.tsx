import AboutSection from "../sections/about.section"
import ContactSection from "../sections/contact.section"
import ExperienceSection from "../sections/experience.section"
import HeroSection from "../sections/hero.section"
import ProjectSection from "../sections/project.section"
import SkillSection from "../sections/skill.section"

function HomePage() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <SkillSection />
            <ProjectSection />

            <ExperienceSection />

            <ContactSection />

        </>
    )
}

export default HomePage