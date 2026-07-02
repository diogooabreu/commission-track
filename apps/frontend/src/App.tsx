import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './stores/AuthContext'
import { AppLayout } from './components/layout/AppLayout'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { Role } from './types/api'

import { Landing } from './pages/Landing/Landing'
import { Login } from './pages/Login/Login'
import { Cadastro } from './pages/Cadastro/Cadastro'
import { NotFound } from './pages/NotFound/NotFound'
import { Unauthorized } from './pages/Unauthorized/Unauthorized'
import { ArtistaPainel } from './pages/ArtistaPainel/ArtistaPainel'
import { ArtistaClientes } from './pages/ArtistaClientes/ArtistaClientes'
import { ArtistaComissaoDetalhes } from './pages/ArtistaComissaoDetalhes/ArtistaComissaoDetalhes'
import { ClienteComissoes } from './pages/ClienteComissoes/ClienteComissoes'
import { ClienteNovaComissao } from './pages/ClienteNovaComissao/ClienteNovaComissao'
import { ClienteComissaoDetalhes } from './pages/ClienteComissaoDetalhes/ClienteComissaoDetalhes'
import { Perfil } from './pages/Perfil/Perfil'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route element={<ProtectedRoute allowedRoles={[Role.ARTIST, Role.CLIENT]} />}>
              <Route path="/perfil" element={<Perfil />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={[Role.ARTIST]} />}>
              <Route path="/artista/painel" element={<ArtistaPainel />} />
              <Route path="/artista/clientes" element={<ArtistaClientes />} />
              <Route path="/artista/comissoes/:id" element={<ArtistaComissaoDetalhes />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={[Role.CLIENT]} />}>
              <Route path="/cliente/comissoes" element={<ClienteComissoes />} />
              <Route path="/cliente/nova" element={<ClienteNovaComissao />} />
              <Route path="/cliente/comissoes/:id" element={<ClienteComissaoDetalhes />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
