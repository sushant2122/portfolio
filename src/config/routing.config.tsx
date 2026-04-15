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
import AdminLayout from '../layout/admin.layout'
import AdminDashboardPage from '../pages/admin/admin.dashboard.page'
import AdminProjectPage from '../pages/admin/admin.project.page'
import AdminSkillPage from '../pages/admin/admin.skill.page'
import AdminExperiencePage from '../pages/admin/admin.experience.page'
import AdminMessagePage from '../pages/admin/admin.message.page'

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

                    <Route path='/admin' element={<AdminLayout />}>
                        <Route index element={<AdminDashboardPage />}></Route>
                        <Route path="project" element={<AdminProjectPage />}></Route>
                        <Route path="skill" element={<AdminSkillPage />}></Route>
                        <Route path="experience" element={<AdminExperiencePage />}></Route>
                        <Route path="message" element={<AdminMessagePage />}></Route>

                    </Route>



                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RoutingConfig