import { Routes } from '@angular/router';
import { PaginacionService } from './services/paginacion/paginacion.service';
import { authGuard } from './guards/auth.guards';
import { rolGuard } from './guards/rol.guards';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component'),
        children: [
            {
                path: 'documentos',
                providers: [PaginacionService],
                loadComponent: () => import('./pages/documento/documentos/cat-documentos.component'),
            },
            {
                path: 'nuevo-documento',
                loadComponent: () => import('./pages/documento/nuevo-documento/nuevo-documento.component'),
                canActivate: [rolGuard]
            },
            {
                path: 'editar-documento/:idDocumento',
                loadComponent: () => import('./pages/documento/editar-documento/editar-documento.component'),
                canActivate: [rolGuard]
            },
            {
                path: 'beneficiarios',
                providers: [PaginacionService],
                loadComponent: () => import('./pages/beneficiario/beneficiarios/beneficiarios.component'),
                canActivate: [rolGuard]
            },
            {
                path: 'nuevo-beneficiario',
                loadComponent: () => import('./pages/beneficiario/nuevo-beneficiario/nuevo-beneficiario.component'),
                canActivate: [rolGuard]
            },
            {
                path: 'editar-beneficiario/:idBeneficiario',
                loadComponent: () => import('./pages/beneficiario/editar-beneficiario/editar-beneficiario.component'),
                canActivate: [rolGuard]
            },
            {
                path: 'tramites',
                providers: [PaginacionService],
                loadComponent: () => import('./pages/tramite/tramites/tramites.component')
            },
            {
                path: 'nuevo-tramite',
                loadComponent: () => import('./pages/tramite/nuevo-tramite/nuevo-tramite.component'),
                canActivate: [rolGuard]
            },
            {
                path: 'editar-tramite/:idTramite',
                loadComponent: () => import('./pages/tramite/editar-tramite/editar-tramite.component'),
                canActivate: [rolGuard]
            }
        ],
        canActivate: [authGuard]
    },
    {
        path: 'registro',
        loadComponent: () => import('./pages/registro/registro.component')
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component')
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
