import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
interface Signos {
  nombre: string;
  apaterno: string;
  amaterno: string;
  dia: number;
  mes: number;
  year: number;
  sexo: string;
}

@Component({
  selector: 'app-orozcopo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orozcopo.component.html',
  styleUrls: ['./orozcopo.component.css']
})
export default class OrozcopoComponent implements OnInit {
  formGroup!: FormGroup;
  clientes: Signos = {
    nombre: '',
    apaterno: '',
    amaterno: '',
    dia: 0,
    mes: 0,
    year: 0,
    sexo: '',
  };

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();

    // Suscribirse a los cambios del formulario
    this.formGroup.valueChanges.subscribe(() => {
      this.actualizarInfoCliente();
    });
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      dia: [''],
      mes: [''],
      year: [''],
      sexo: ['']
    });
  }

  actualizarInfoCliente(): void {
    const { nombre, apaterno, amaterno, dia, mes, year, sexo } = this.formGroup.value;
    
    this.clientes.nombre = nombre;
    this.clientes.apaterno = apaterno;
    this.clientes.amaterno = amaterno;
    this.clientes.dia = dia;
    this.clientes.mes = mes;
    this.clientes.year = year;
    this.clientes.sexo = sexo;

    // Actualizar los datos en localStorage cada vez que el formulario cambia
    localStorage.setItem('clienteInfo', JSON.stringify(this.clientes));
  }

  onSubmit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/auth/orozcopo-r']);
  }
  nombreCompleto!: string;
  dia!: number;
  mes!: number;
  year!: number;
  signoZodiacal!: string;
  edad!: number;
  imagenSigno!: string;

  signosZodiacoChino = [
    'Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente',
    'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'
  ];

  signosZodiacoImagenes = [
    'https://us-tuna-sounds-images.voicemod.net/ecf2a8da-18c0-42e6-954a-6a7406cb682f-1712546304098.jpeg',  // URL para Rata
    'https://www.shutterstock.com/shutterstock/photos/2223661545/display_1500/stock-vector-dancing-cow-illustration-pixel-art-meme-2223661545.jpg',  // URL para Buey
    'https://es-static.z-dn.net/files/d18/1c713385731cb8edd9830a8891d98965.jpg', // URL para Tigre
    'https://www.debate.com.mx/img/2020/06/19/cual_es_el_origen_del_meme_de_bugs_bunny_comunista_que_se_ha_vuelto_viral_x2x_1_crop1592608848177.jpg?__scale=w:1200,h:740,t:2,q:100',// URL para Conejo
    'https://us-tuna-sounds-images.voicemod.net/93d24642-d3f9-41ec-bcbd-20f2fb339b98-1703348219346.png',// URL para Dragón
    'https://www.animalbank.net/wp-content/uploads/2020/05/serp2.jpg',// URL para Serpiente
    'https://us-tuna-sounds-images.voicemod.net/4a92108d-6667-4915-ab88-28ad689eea8e-1710816622622.png', // URL para Caballo
    'https://www.recreoviral.com/wp-content/uploads/2016/02/Batalla-de-photoshop-a-la-cabrita-presumida-2.jpg',   // URL para Cabra
    'https://www.notigape.com/thumburl/thumbnail/900x506/outbound/uploads/photos/aiYZQxtTdJyA8gkPFQbN.jpeg',    // URL para Mono
    'https://images3.memedroid.com/images/UPLOADED147/6653ae269bb94.webp',   // URL para Gallo
    'https://images.habbotemplarios.com/2020/06/impaktado.jpg',   // URL para Perro
    'https://static.wikia.nocookie.net/olivia/images/0/0b/William.png/revision/latest?cb=20101207123745'    // URL para Cerdo
  ];

  resultados(): void {
    // Obtener los datos almacenados en localStorage
    const clienteInfo = localStorage.getItem('clienteInfo');
    
    if (clienteInfo) {
      const cliente = JSON.parse(clienteInfo);
      this.nombreCompleto = `${cliente.nombre} ${cliente.apaterno} ${cliente.amaterno};`
      this.dia = cliente.dia;
      this.mes = cliente.mes;
      this.year = cliente.year;

      // Calcular el signo zodiacal chino
      this.calcularSignoZodiacal(this.year);

      // Calcular la edad
      this.calcularEdad(this.dia, this.mes, this.year);
    }
  }

  calcularSignoZodiacal(year: number): void {
    const index = (year - 4) % 12;
    this.signoZodiacal = this.signosZodiacoChino[index];
    this.imagenSigno = this.signosZodiacoImagenes[index]; // Asigna la URL de la imagen
  }

  calcularEdad(dia: number, mes: number, year: number): void {
    const actual = new Date();
    let edad = actual.getFullYear() - year;

    const cumple = new Date(actual.getFullYear(), mes - 1, dia);

    if (actual < cumple) {
      edad--;
    }

    this.edad = edad;
  }
}



