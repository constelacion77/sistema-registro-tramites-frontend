import { Routes } from '@angular/router';
import { PaginacionService } from './services/paginacion/paginacion.service';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component'),
        children: [
            {
                path: 'documentos',
                providers: [PaginacionService],
                loadComponent: () => import('./pages/documento/documentos/cat-documentos.component')
            },
            {
                path: 'nuevo-documento',
                loadComponent: () => import('./pages/documento/nuevo-documento/nuevo-documento.component')
            },
            {
                path: 'editar-documento/:idDocumento',
                loadComponent: () => import('./pages/documento/editar-documento/editar-documento.component')
            },
            {
                path: 'beneficiarios',
                providers: [PaginacionService],
                loadComponent: () => import('./pages/beneficiario/beneficiarios/beneficiarios.component')
            },
            {
                path: 'nuevo-beneficiario',
                loadComponent: () => import('./pages/beneficiario/nuevo-beneficiario/nuevo-beneficiario.component')
            },
            {
                path: 'editar-beneficiario/:idBeneficiario',
                loadComponent: () => import('./pages/beneficiario/editar-beneficiario/editar-beneficiario.component')
            },
            {
                path: 'tramites',
                providers: [PaginacionService],
                loadComponent: () => import('./pages/tramite/tramites/tramites.component')
            },
            {
                path: 'nuevo-tramite',
                loadComponent: () => import('./pages/tramite/nuevo-tramite/nuevo-tramite.component')
            },
            {
                path: 'editar-tramite/:idTramite',
                loadComponent: () => import('./pages/tramite/editar-tramite/editar-tramite.component')
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
