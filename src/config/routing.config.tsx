import { BrowserRouter, Routes, Route } from 'react-router'
import HomeLayout from '../layout/home.layout'
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
import { AuthProvider } from '../context/auth.context'
import PermissionChecker from './permission.config'
import HomePage from '../pages/home.page'
import PrivacyPolicyPage from '../pages/privacypolicy.page'
import TermsPage from '../pages/terms&condition.page'

function RoutingConfig() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <ToastContainer />
                    <Routes>
                        <Route path="/" element={

                            <HomeLayout />


                        }>
                            <Route index element={<HomePage />}></Route>

                        </Route>
                        <Route path='*' element={<ErrorPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/reset' element={<EmailResetPage />} />
                        <Route path='privacy-policy' element={<PrivacyPolicyPage />} />
                        <Route path='term' element={<TermsPage />} />
                        <Route path='/reset-password/:token' element={<PasswordResetPage />} />

                        <Route path='/admin' element={<PermissionChecker allowedBy="Admin">
                            <AdminLayout />
                        </PermissionChecker>}>
                            <Route index element={<AdminDashboardPage />}></Route>
                            <Route path="project" element={<AdminProjectPage />}></Route>
                            <Route path="skill" element={<AdminSkillPage />}></Route>
                            <Route path="experience" element={<AdminExperiencePage />}></Route>
                            <Route path="message" element={<AdminMessagePage />}></Route>

                        </Route>



                    </Routes>
                </BrowserRouter>

            </AuthProvider>

        </>
    )
}

export default RoutingConfig