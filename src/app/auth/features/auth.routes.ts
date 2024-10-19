import {Routes} from "@angular/router";

export default[
    {
        path: 'sing-in',
        loadComponent:()=> import ('./sing-in/sing-in.component')
    },
    {
        path: 'sing-up',
        loadComponent:()=> import ('./sing-up/sing-up.component')
    },

]as Routes