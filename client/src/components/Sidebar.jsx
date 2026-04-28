import { NavLink } from 'react-router-dom'
import { Home, User, FileText, Folder, Mail } from 'lucide-react'

const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/about', icon: User, label: 'About' },
    { path: '/resume', icon: FileText, label: 'Resume' },
    { path: '/projects', icon: Folder, label: 'Projects' },
    { path: '/contact', icon: Mail, label: 'Contact' },
]

const Sidebar = () => {
    return (
        <aside className="fixed left-0 top-0 h-screen w-16 flex flex-col items-center py-8 gap-6"
            style={{
                backgroundColor: 'rgba(8, 10, 20, 0.5)',
                borderRight: '1px solid rgba(30, 30, 46, 0.5)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                zIndex: 10,
            }}>
            {navItems.map(({ path, icon: Icon, label }) => (
                <NavLink
                    key={path}
                    to={path}
                    end={path === '/'}
                    title={label}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 group
             ${isActive ? 'text-purple-400' : 'text-slate-400 hover:text-purple-400'}`
                    }
                >
                    <Icon size={22} />
                    <span className="text-xs">{label}</span>
                </NavLink>
            ))}
        </aside>
    )
}

export default Sidebar