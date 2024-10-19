import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Empleado {
  matricula: number;
  nombre: string;
  email: string;
  edad: number;
  horas: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export default class EmpleadosComponent implements OnInit {

  formulario!: FormGroup;
  empleados: Empleado[] = [];
  totalPagos: number = 0;
  errorMessage: string = '';       // Para errores
  successMessage: string = '';     // Para mensajes de éxito
  matriculaModificar: number | null = null;
  matriculaEliminar: number | null = null;
  tablaVisible: boolean = false;


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.initForm();
    this.cargarEmpleados();
    this.calcularTotalPagos();
  }

  initForm(): FormGroup {
    return this.fb.group({
      matricula: ['', [Validators.required]],  // Obligatorio
      nombre: ['', [Validators.required]],     // Obligatorio
      email: ['', [Validators.required, Validators.email]],  // Obligatorio y formato de correo válido
      edad: ['', [Validators.required, Validators.min(18)]], // Obligatorio y mayor de edad
      horas: ['', [Validators.required, Validators.min(1)]]  // Obligatorio y al menos 1 hora
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.successMessage = '';  
      return;
    }
  
    const { matricula, nombre, email, edad, horas } = this.formulario.value;
  
    const matriculaExiste = this.empleados.some(empleado => empleado.matricula === matricula);
    const correoExiste = this.empleados.some(empleado => empleado.email === email);
  
    if (matriculaExiste && this.matriculaModificar === null) {
      this.successMessage = '';  
      return;
    }
  
    if (correoExiste && this.matriculaModificar === null) {
      this.successMessage = '';  
      return;
    }
  
    const pagoNormal = this.calcularPagoNormal(horas);
    const pagoExtra = this.calcularPagoExtra(horas);
    const subtotal = pagoNormal + pagoExtra;
  
    const empleado: Empleado = {
      matricula,
      nombre,
      email,
      edad,
      horas,
    };
  
    if (this.matriculaModificar !== null) {
      for (let i = 0; i < this.empleados.length; i++) {
        if (this.empleados[i].matricula === this.matriculaModificar) {
          this.empleados[i] = empleado; 
          break; 
        }
      }
      this.matriculaModificar = null;
    } else {
      this.empleados.push(empleado);
    }
  
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  
    this.calcularTotalPagos();
    this.formulario.reset();
    this.tablaVisible = false;

  }
  

  cargarEmpleados(): void {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }

  calcularPagoNormal(horas: number): number {
    return Math.min(horas, 40) * 70;
  }

  calcularPagoExtra(horas: number): number {
    return Math.max(horas - 40, 0) * 140;
  }

  calcularTotalPagos(): void {
    this.totalPagos = this.empleados.reduce((sum, empleado) => {
      const pagoNormal = this.calcularPagoNormal(empleado.horas);
      const pagoExtra = this.calcularPagoExtra(empleado.horas);
      const subtotal = pagoNormal + pagoExtra;
      return sum + subtotal;
    }, 0);
  }
  mostrarOcultarTabla() {
    this.tablaVisible = !this.tablaVisible;
  }

  buscarEmpleadoPorMatricula(): void {
    if (this.matriculaModificar !== null) {
      let empleado = null;
  
      // Usar un bucle for para buscar el empleado
      for (let i = 0; i < this.empleados.length; i++) {
        if (this.empleados[i].matricula === this.matriculaModificar) {
          empleado = this.empleados[i];
          break; 
        }
      }
  
      if (empleado) {
        this.formulario.patchValue(empleado);  
        this.successMessage = '';  
      } else {
        this.successMessage = '';  
      }
    }
  }
  
  eliminarEmpleadoPorMatricula(): void {
    if (this.matriculaEliminar !== null) {
      const empleadosActualizados = [];
  
      for (let i = 0; i < this.empleados.length; i++) {
        if (this.empleados[i].matricula !== this.matriculaEliminar) {
          empleadosActualizados.push(this.empleados[i]);
        }
      }
      this.empleados = empleadosActualizados;
      localStorage.setItem('empleados', JSON.stringify(this.empleados));
  
      this.calcularTotalPagos();
      this.matriculaEliminar = null;
      this.successMessage = 'Empleado eliminado correctamente.';
    }
  }
  
}
