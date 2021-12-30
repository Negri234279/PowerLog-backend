import { useState } from 'react'
import {
    Link,
    AppBar,
    Box,
    Toolbar,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    IconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const pages = [ 
    { title: 'Caculadora de discos',  url: '/calc' },
    { title: 'Aproximaciones', url: '/aprox' },
    { title: 'Task list', url: '/task' },
    { title: 'New task', url: '/task/new' }
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [auth, setAuth] = useState(true)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <Button href="/" sx={{ color: 'white' }}>
                            <Typography variant="h6"> PowerLog </Typography>
                        </Button>
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map(({ url, title }, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    href={url}
                                >
                                    <Typography textAlign="center">
                                        <Link
                                            href={url}
                                            sx={{ color: 'black' }}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            {title}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <Button href="/" sx={{ color: 'white' }}>
                            <Typography variant="h6"> PowerLog </Typography>
                        </Button>
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: { xs: 'none', md: 'flex-end' },
                        }}
                    >
                        {pages.map(({ url, title }, index) => (
                            <Button
                                key={index}
                                href={url}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {title}
                            </Button>
                        ))}
                    </Box>

                    {auth ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar alt="avatar" src="" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    ) : (
                        'Iniciar sesion'
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Navbar