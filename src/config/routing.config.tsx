import { BrowserRouter, Routes, Route } from 'react-router'
import HomeLayout from '../layout/home.layout'
import HeroSection from '../sections/hero.section'
import AboutSection from '../sections/about.section'
import SkillSection from '../sections/skill.section'
import ExperienceSection from '../sections/experience.section'
import ContactSection from '../sections/contact.section'
import ProjectSection from '../sections/project.section'
import ErrorPage from '../pages/error.page'
import { ToastContainer } from 'react-toastify'
import LoginPage from '../pages/login.page'
import EmailResetPage from '../pages/email_reset.page'
import PasswordResetPage from '../pages/password_reset.page'

function RoutingConfig() {
    return (
        <>
            <BrowserRouter>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        <Route index element={<HeroSection />}></Route>
                        <Route path="/about" element={<AboutSection />}></Route>
                        <Route path="/skill" element={<SkillSection />}></Route>
                        <Route path="/experience" element={<ExperienceSection />}></Route>
                        <Route path="/contact" element={<ContactSection />}></Route>
                        <Route path="/project" element={<ProjectSection />}></Route>
                    </Route>
                    <Route path='*' element={<ErrorPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/reset' element={<EmailResetPage />} />
                    <Route path='/resetpassword/:token' element={<PasswordResetPage />} />


                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RoutingConfig