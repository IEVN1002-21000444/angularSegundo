import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import  Ejemplo1Component  from "./formulario/ejemplo1/ejemplo1.component";
import  OrozcopoComponent  from './formulario/orozcopo/orozcopo.component';
import EmpleadosComponent from "./formulario/empleados/empleados.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Ejemplo1Component, OrozcopoComponent, EmpleadosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}
