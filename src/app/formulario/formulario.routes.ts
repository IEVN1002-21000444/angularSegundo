import {Routes} from "@angular/router";

export default[
    {
        path: 'ejemplo1',
        loadComponent:()=> import ('./ejemplo1/ejemplo1.component')
    },
    {
        path: 'orozcopo',
        loadComponent:()=> import ('./orozcopo/orozcopo.component')
    }
    ,
    {
        path: 'empleados',
        loadComponent:()=> import ('./empleados/empleados.component')
    }
]as Routes