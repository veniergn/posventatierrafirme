import { User, Project, ConstructionMilestone, UnitDetail, MediaUploadItem, AuditLog } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Juan Pérez',
    dni: '34.892.104',
    email: 'juan.perez@email.com',
    phone: '+54 9 11 4455-8899',
    role: 'propietario',
    complex: 'Complejo Terrazas Park',
    unit: 'Unidad 4° B',
    parking: 'N° 12 (Nivel 1)',
    storage: 'Baulera B-04',
    balance: '$ 450,000.00',
    nextPaymentDate: '15 Nov',
    password: 'propietario123',
    isCustomPassword: true,
    activationCode: 'TF-8492',
    status: 'activo',
    createdAt: '2023-09-12',
    activatedAt: '2023-09-14',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Ax05Y8riVpTRkGPvUlPsXYKnwTU0egIgFy_NoK2cf-5hKk4czhB_a54bL673NXSjvvsUWcaL0MyYlLFEMcAJYfiSS9nocRA9lSTff6Gy0SfqXNhhFfwJP0V7df1UHTS9Y6z7IvwqVv-c2MByLaiHHa-uJKG-tohxddz_zjL33mm9OlLFeKIwEJyqbZa8w_1UwHW7jU0O28dk3la9yNWBWtgO8Rn5BpZxu6UOTsMM3KDrwECVvddqrg'
  },
  {
    id: 'usr-2',
    name: 'Carlos Mendoza',
    dni: '31.450.928',
    email: 'carlos.m@example.com',
    phone: '+54 9 11 5566-7788',
    role: 'propietario',
    complex: 'Torre Altura Smart Living',
    unit: 'Torre A - 401',
    parking: 'Nivel 1 - C12',
    storage: 'Baulera A-11',
    balance: '$ 320,000.00',
    nextPaymentDate: '20 Nov',
    password: 'propietario123',
    isCustomPassword: false,
    activationCode: 'TF-4910',
    status: 'activo',
    createdAt: '2023-10-01',
    activatedAt: '2023-10-02',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5k6CYaj5nQwaL91Ju7Q7qEsTafxR0dgcRfRhIo57Y9wnN_YoX7K8knZnmYHxS8zxxBl2ZCkHwrPmV93rj29Rsq_tZlAuS6a6tGpl1XZTNQ6MyfFHJeWCNgK0ICzpFclG4VMtxcK056bWHwR7chN4FpY-LGbebKv48E8UcWcbjZdGn2iOIFRJFtnzeb1_NThqGKPBR2a0FRhzKAUZOV8D5dxJttE16_WR11lsUJvYFeod037ULNSzSiA'
  },
  {
    id: 'usr-3',
    name: 'Laura Martinez',
    dni: '29.118.472',
    email: 'laura.admin@tierrafirme.com',
    phone: '+54 9 11 6789-0123',
    role: 'staff',
    staffRole: 'Administración',
    permissions: 'admin',
    password: 'admin',
    isCustomPassword: true,
    activationCode: 'TF-9041',
    status: 'activo',
    createdAt: '2023-08-15',
    activatedAt: '2023-08-15',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx0IGHia2fSAOWWlWk860ZEE2caN9bprdAmgHR5rUhLe5_OOM9pzP_4bfTu9fe0W9A7zdnPTQmhc9EhV_Pq4-NpdH-cO4TbqM6QFfYCY9od-sCbWQfE3ABu2WjTI_P4jEBylMY0sJO6iP4KGR9wx2KqiLR7N_H1A3Vx9b5z-Spq7-xWLJNKxjZm8uKvBkJRiEKAPigqp99ILZzv4FCI3ihSgNfXSsvs3lLHwre8_vksZHjAWK0NL5iag'
  },
  {
    id: 'usr-4',
    name: 'Roberto Silva',
    dni: '27.654.321',
    email: 'rsilva.invest@mail.com',
    phone: '+54 9 11 9988-1122',
    role: 'propietario',
    complex: 'Complejo Terrazas Park',
    unit: 'Villa 12',
    parking: 'Nivel 2 - C45',
    balance: '$ 610,000.00',
    nextPaymentDate: '30 Nov',
    password: 'temp_password',
    isCustomPassword: false,
    activationCode: 'TF-9482',
    status: 'pendiente',
    createdAt: '2023-10-18'
  },
  {
    id: 'usr-5',
    name: 'Ing. Roberto Sánchez',
    dni: '24.901.882',
    email: 'roberto.sanchez@tierrafirme.com',
    phone: '+54 9 11 3344-5566',
    role: 'staff',
    staffRole: 'Director de Obra',
    permissions: 'admin',
    password: 'admin',
    isCustomPassword: true,
    activationCode: 'TF-1102',
    status: 'activo',
    createdAt: '2023-01-10',
    activatedAt: '2023-01-10',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMks8JC0UvYop6Yiin0-8OLEzXfiOkhnEwswp3MUQN4V1xBqUWGTACNyjczhBrrUuXTv5GO2CxldnI1BSO44cyflzP7akxEmpkMhQPJE552cAtdQo2hkeorfdRE3kCKFRAu9kj18MDcZj52hnZANmpQmg7F_u1xJvpkeN12c6cpcGGhIqTVMYMtA6nhx7aAvQxcCvBX9c2HzkEhtpvTemK6XG_X6uTH8ThYh2Oj1D_miBpwgv6wVznPw'
  },
  {
    id: 'usr-6',
    name: 'Arq. Mariana Rossi',
    dni: '32.194.506',
    email: 'mariana.rossi@tierrafirme.com',
    phone: '+54 9 11 2233-4455',
    role: 'staff',
    staffRole: 'Arquitecto',
    permissions: 'fotos',
    password: 'admin',
    isCustomPassword: true,
    activationCode: 'TF-7319',
    status: 'activo',
    createdAt: '2023-06-20',
    activatedAt: '2023-06-21',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN-CB9lTllAot_HDs7j4JNYdaOlz87vI7VNct2CdSAoFSnpkRb18DbqPt3mlFyL5l9Fi8oAfr06vwJO1hVMC8C6Hdu-ZWLNS-rqqHyzxkzrgHWXO5XnBO77Te7C8x7_tnctF9RHpsslKJ-PY3tZXNj7O_ZrSE8_-lAcAVFLywwAFVv4mAk9omjtcvGblKofNUU3mfjMm2P-UdipGCEEVslFcga793DIEabAIh4AVMj85sLR7wqLPnNew'
  },
  {
    id: 'usr-7',
    name: 'Valentina Gómez',
    dni: '36.804.112',
    email: 'valen.gomez@gmail.com',
    phone: '+54 9 11 7788-9900',
    role: 'propietario',
    complex: 'Madero Boutique Residences',
    unit: 'Unidad 402 - Torre B',
    parking: 'Cochera 402 (Nivel 2)',
    storage: 'Baulera 402',
    balance: '$ 0.00 (Al día)',
    nextPaymentDate: 'Entrega Final',
    password: 'propietario123',
    isCustomPassword: true,
    activationCode: 'TF-3829',
    status: 'activo',
    createdAt: '2023-05-10',
    activatedAt: '2023-05-12',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnmsN12eib-lSfJLceGBr8nRcLE5-3BepevHMVbVSn_jKHFeeK_0emFB4BI8612bfHYTce_8qoSw4jk1X3VQcNgCTKx1uxe-JBldkbA_Lyy6gjh1pXGpB-A4rvRTBWGiNpODx4XPZp_IjWQ8N9PLU4ZGSR0S2-VHlGnVibPmfezut8EsRMAU8cQXGLAn3V5YFxiBqlztGruWF8SgQP6duTuCLyLpS5XGGsxiCvzpMJJXy8B6tdYawfGw'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Complejo Terrazas Park',
    tagline: 'Residencias de categoría frente al verde en zona residencial exclusiva.',
    phase: 'Fase 3: Estructura & Mampostería',
    status: 'En Construcción',
    commercialStatus: 'En Construcción',
    unitsSold: 85,
    totalUnits: 120,
    progress: 72,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWq6C84h81Xhr9fnBPMuddOo4JrFXjqer8r7LrepnpTDv_ikHtvjlkBIychnGbFMSROL-l7EkiXp6IS1IG0P__mzveajRcAJw9saNsUEaAjPJYYAN8_9w4vKd1-i-U-0ZpzyZufsgBMevIt2TDu2Ibh63CpwKQNzlAySv-QWuokpuZXBIQ3UEmz-VfniAutQL8CgpnByF-Ex_6Ttiz4MO37jcgkJ5uHELrlzJwRBOnuIaehjrfRYfZgQ',
    address: 'Av. del Libertador 1234, CABA',
    estimatedDelivery: 'Octubre 2024',
    description: 'Exclusivo complejo residencial de 120 unidades con vista panorámica, amplios balcones aterrazados y amenities de nivel internacional.',
    advisorName: 'Lic. Matías Valenzuela',
    advisorPhone: '+54 9 11 4920-3344',
    advisorEmail: 'mvalenzuela@tierrafirme.com',
    volumetricRenders: [
      {
        id: 'vr-1-1',
        title: 'Fachada Principal Diurna',
        category: 'diurno',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWq6C84h81Xhr9fnBPMuddOo4JrFXjqer8r7LrepnpTDv_ikHtvjlkBIychnGbFMSROL-l7EkiXp6IS1IG0P__mzveajRcAJw9saNsUEaAjPJYYAN8_9w4vKd1-i-U-0ZpzyZufsgBMevIt2TDu2Ibh63CpwKQNzlAySv-QWuokpuZXBIQ3UEmz-VfniAutQL8CgpnByF-Ex_6Ttiz4MO37jcgkJ5uHELrlzJwRBOnuIaehjrfRYfZgQ',
        description: 'Perspectiva peatonal con tratamiento de hormigón visto y aleros de protección solar.'
      },
      {
        id: 'vr-1-2',
        title: 'Vista Nocturna & Iluminación LED',
        category: 'nocturno',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARWyQpEMRq7DTocExvdapyMoyYuFDeF4a4PERlpFk4hU5AXRDd5OnWddLSmoJsgJ4ab5h08kTA35hjgeZNaVZS019ja0LGPjIJU4R-ckZIgVbsOCIO_u_XYvlUUDvOaPVpNm_N5h1R0LCN-FyYHyTM8aN3qv34vjE_o6e13KcekPZ54UEf-6I8HLuTUAM78Fs0O9mQz3fCesxahzxB5WYAnn3ZQTX5yisG6fymvLhCayHHCmS5RG-74g',
        description: 'Diseño lumínico escenográfico en balcones y remate arquitectónico.'
      },
      {
        id: 'vr-1-3',
        title: 'Vista Aérea Drone & Implantación',
        category: 'aereo',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgaAK_u27yeFmmEvmn9LrzVka9l-OCtB7MejiY_kXKT2PtlnvVEwUPZlSqYvfaC4ieKX71MeZjdYMQvWfZPGHWs6hngfba9GpXTT_kg2uc0jlNUyMGfZ1tgHf9-_jCcpx3ULGJFpVj9fKIzazlaXiLu_a7TdyRUnRSt6PW7_CH59tbp-QSiFYLKbG6L1ICcd9j7cosBCLKVt8ibL_8aSveFHCC38HlKrClwVEtfZWtN62rGxgqMscntw',
        description: 'Implantación urbana con orientación norte y visuales despejadas hacia los parques.'
      },
      {
        id: 'vr-1-4',
        title: 'Volumetría Estructural 3D',
        category: 'volumetria',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWFijFffOMoKSMJBMsG5cmaTF1iOjssbmqQrg63jSX68V7uoQJXO4hZ9qfjdglQaueQkh975n1XL1obP4CNWbzdCMHJR_2FsLD6yc2iYjheN6gs7rXTUStscXJvfrv1RNM9Pm9kKNq7BSbZUbZJF4qEGT-Pe9mw3N3IdLKD5QnekITnMo_rgTdkwVfq6bI3WZBnToiFutAxAV25Ak1jaR-yglDM9QsQ13JEwA4wIlIMuoTkY1plyqzrg',
        description: 'Esquema de masas volumétricas con quiebres que maximizan la entrada de luz natural.'
      }
    ],
    typologies: [
      {
        id: 'tip-1-1',
        title: 'Tipología A: 1 Dormitorio Junior Suite',
        rooms: '2 Ambientes',
        surfaceM2: 54,
        balconyM2: 8,
        floorPlanUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Ax05Y8riVpTRkGPvUlPsXYKnwTU0egIgFy_NoK2cf-5hKk4czhB_a54bL673NXSjvvsUWcaL0MyYlLFEMcAJYfiSS9nocRA9lSTff6Gy0SfqXNhhFfwJP0V7df1UHTS9Y6z7IvwqVv-c2MByLaiHHa-uJKG-tohxddz_zjL33mm9OlLFeKIwEJyqbZa8w_1UwHW7jU0O28dk3la9yNWBWtgO8Rn5BpZxu6UOTsMM3KDrwECVvddqrg',
        description: 'Ideal inversión para renta temporaria o primer hogar. Cocina integrada con isla de cuarzo y suite con vestidor.',
        features: ['Cocina integrada con anafe vitrocerámico', 'Balcón aterrazado con parrilla eléctrica', 'Cerradura digital inteligente Samsung'],
        priceEstimate: 'Desde USD 135,000',
        unitsAvailable: 4
      },
      {
        id: 'tip-1-2',
        title: 'Tipología B: 2 Dormitorios Master Suite',
        rooms: '3 Ambientes',
        surfaceM2: 88,
        balconyM2: 14,
        floorPlanUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Ax05Y8riVpTRkGPvUlPsXYKnwTU0egIgFy_NoK2cf-5hKk4czhB_a54bL673NXSjvvsUWcaL0MyYlLFEMcAJYfiSS9nocRA9lSTff6Gy0SfqXNhhFfwJP0V7df1UHTS9Y6z7IvwqVv-c2MByLaiHHa-uJKG-tohxddz_zjL33mm9OlLFeKIwEJyqbZa8w_1UwHW7jU0O28dk3la9yNWBWtgO8Rn5BpZxu6UOTsMM3KDrwECVvddqrg',
        description: 'Distribución pasante con excelente ventilación cruzada. Dormitorio principal en suite, segundo dormitorio y toilette.',
        features: ['Suite principal con baño compartimentado', 'Living comedor con salida directa al balcón', 'Pisos de porcelanato símil madera 120x20'],
        priceEstimate: 'Desde USD 210,000',
        unitsAvailable: 6
      },
      {
        id: 'tip-1-3',
        title: 'Tipología C: 3 Dormitorios Family Residence',
        rooms: '4 Ambientes + Dep.',
        surfaceM2: 120,
        balconyM2: 22,
        floorPlanUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Ax05Y8riVpTRkGPvUlPsXYKnwTU0egIgFy_NoK2cf-5hKk4czhB_a54bL673NXSjvvsUWcaL0MyYlLFEMcAJYfiSS9nocRA9lSTff6Gy0SfqXNhhFfwJP0V7df1UHTS9Y6z7IvwqVv-c2MByLaiHHa-uJKG-tohxddz_zjL33mm9OlLFeKIwEJyqbZa8w_1UwHW7jU0O28dk3la9yNWBWtgO8Rn5BpZxu6UOTsMM3KDrwECVvddqrg',
        description: 'Unidad emblemática de amplias dimensiones con palier semiprivado, master suite, dos dormitorios juveniles y dependencia.',
        features: ['Palier semiprivado con doble acceso', 'Balcón terraza con parrilla a gas empotrada', 'Climatización individual por VRV Inverter'],
        priceEstimate: 'Desde USD 315,000',
        unitsAvailable: 2
      },
      {
        id: 'tip-1-4',
        title: 'Penthouse Exclusivo con Rooftop Privado',
        rooms: '5 Ambientes Dúplex',
        surfaceM2: 185,
        balconyM2: 65,
        floorPlanUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Ax05Y8riVpTRkGPvUlPsXYKnwTU0egIgFy_NoK2cf-5hKk4czhB_a54bL673NXSjvvsUWcaL0MyYlLFEMcAJYfiSS9nocRA9lSTff6Gy0SfqXNhhFfwJP0V7df1UHTS9Y6z7IvwqVv-c2MByLaiHHa-uJKG-tohxddz_zjL33mm9OlLFeKIwEJyqbZa8w_1UwHW7jU0O28dk3la9yNWBWtgO8Rn5BpZxu6UOTsMM3KDrwECVvddqrg',
        description: 'Exclusiva residencia en el último piso con terraza panorámica de 65m², jacuzzi privado y visuales 360° a la ciudad.',
        features: ['Rooftop con solárium y jacuzzi hidromasaje', 'Master suite con vestidor doble de roble', 'Cochera doble cubierta con cargador para EV'],
        priceEstimate: 'Consultar Lista Especial',
        unitsAvailable: 1
      }
    ],
    amenitiesList: [
      {
        id: 'am-1-1',
        title: 'Piscina Climatizada & Solárium',
        description: 'Piscina infinity en altura con revestimiento en piedra volcánica y deck de madera lapacho.',
        renderUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATl4nmeyMNVmef3ekZT525cWqAgZi0ezmd_hiElShr58TVq-lWiQIuEeJlX-Li4vyawMmT-2hxRHmK3XaxKSpDmXT602nJsmcXimxanJDW6tyLHThhDDZ4V2_sDzudBVgp4AqWlBlG-nDj-2DQ5XPiqxDdswsFUIUYu0oHIXq7V6DJeZ_W5L9hEG1ObR1ZFxHe5AJ10VFZgkdNMpasSp87xZI6CUT0FVtd1UxHSxg15-OSasP0SwadZQ'
      },
      {
        id: 'am-1-2',
        title: 'SUM Gourmet con Asadores',
        description: 'Salón de usos múltiples totalmente equipado para 30 personas con cocina gastronómica industrial.',
        renderUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClvMsO_dw82NPAMbxXFaM4elWpTcr66m-GsmYMPDJ6P5rxQj3xaBAaEkwFI5YjnKB9r24hFmxVTU1dSYpE9CkxJdLNa1cLDlW6-EFOjZ5IH7qJwTze1Om2SJTh0TWKD5sMd0FgcCRTDHdTV4IG-zd89Oe8fMcqJL57jlFxBKWFwwvjAx3IhCUHNMK4v3A_9FZZihHZk5Vze5QqiPTc4hkOwncfXVp3nFTWlTU-O508YDx1P_Zywyihog'
      },
      {
        id: 'am-1-3',
        title: 'Coworking Lounge & Salas Zoom',
        description: 'Espacio de trabajo moderno con conectividad de fibra óptica simétrica, cabinas acústicas privadas y cafetería.',
        renderUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcsLOpHMxnDQlp2HsHkfw91PLU8vDJlDejjLWrf5zs0mkOGXAroStcYaw1bfYej9nAXPG-hTGGkvE13ghzCTn3-Op1Y67nu2_lWDpMFEQz2JX-kqyNjk7vRgq2adAscn36sxv4Tg9xfxOAXScDrXOgexiiJFKMrqaqKDGw4YIZqoPwrq-BROUkQVK5igq8BveOv-3oVr2fVK98BonVs80v2hUBTtVg6VEeE2ey8y1devVu_aFHSIuApw'
      },
      {
        id: 'am-1-4',
        title: 'Gimnasio de Alto Rendimiento',
        description: 'Equipamiento cardiovascular y de fuerza de última generación con área de yoga y stretching exterior.',
        renderUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Dg5-GoB6fJxtvSnd4FBKz6U5WEwu_1v1CWDnnwmcS4_Rww1AvyLXO5vB8z0PaSOsVUZrc5RK4pgeTQEwwOVlNm-KRso8Or1-ydLLhMSUPQmkrCF5QsAm3lGLuU8mjgE-S9TIBGYog8exCNoyW1kJqhmVYoCrIUhb9K47zAB7gnvSJ3kF2Yv1JesulYLzqF83qlBeBtbuKDqbH0Wznri32nprrfd9Sz3TCCbeErekaEkN2az8CodAyQ'
      }
    ]
  },
  {
    id: 'proj-2',
    name: 'Torre Altura Smart Living',
    tagline: 'Innovación urbana y arquitectura vertical para una vida conectada.',
    phase: 'Fase 1: Excavación & Subsuelos',
    status: 'Pre-Sale',
    commercialStatus: 'En Pozo - Preventa',
    unitsSold: 40,
    totalUnits: 150,
    progress: 18,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWFijFffOMoKSMJBMsG5cmaTF1iOjssbmqQrg63jSX68V7uoQJXO4hZ9qfjdglQaueQkh975n1XL1obP4CNWbzdCMHJR_2FsLD6yc2iYjheN6gs7rXTUStscXJvfrv1RNM9Pm9kKNq7BSbZUbZJF4qEGT-Pe9mw3N3IdLKD5QnekITnMo_rgTdkwVfq6bI3WZBnToiFutAxAV25Ak1jaR-yglDM9QsQ13JEwA4wIlIMuoTkY1plyqzrg',
    address: 'Calle Corrientes 4500, Villa Crespo',
    estimatedDelivery: 'Marzo 2026',
    description: 'Torre de vanguardia con 150 departamentos con domótica integrada, pensados para jóvenes profesionales y familias modernas en un polo gastronómico consolidado.',
    advisorName: 'Florencia Benítez',
    advisorPhone: '+54 9 11 5812-9900',
    advisorEmail: 'fbenitez@tierrafirme.com',
    volumetricRenders: [
      {
        id: 'vr-2-1',
        title: 'Fachada Vertical Smart',
        category: 'diurno',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWFijFffOMoKSMJBMsG5cmaTF1iOjssbmqQrg63jSX68V7uoQJXO4hZ9qfjdglQaueQkh975n1XL1obP4CNWbzdCMHJR_2FsLD6yc2iYjheN6gs7rXTUStscXJvfrv1RNM9Pm9kKNq7BSbZUbZJF4qEGT-Pe9mw3N3IdLKD5QnekITnMo_rgTdkwVfq6bI3WZBnToiFutAxAV25Ak1jaR-yglDM9QsQ13JEwA4wIlIMuoTkY1plyqzrg',
        description: 'Silueta esbelta con doble piel de vidrio de alta eficiencia térmica DVH.'
      },
      {
        id: 'vr-2-2',
        title: 'Sky Lounge Nivel 25',
        category: 'nocturno',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARWyQpEMRq7DTocExvdapyMoyYuFDeF4a4PERlpFk4hU5AXRDd5OnWddLSmoJsgJ4ab5h08kTA35hjgeZNaVZS019ja0LGPjIJU4R-ckZIgVbsOCIO_u_XYvlUUDvOaPVpNm_N5h1R0LCN-FyYHyTM8aN3qv34vjE_o6e13KcekPZ54UEf-6I8HLuTUAM78Fs0O9mQz3fCesxahzxB5WYAnn3ZQTX5yisG6fymvLhCayHHCmS5RG-74g',
        description: 'Vistas abiertas al skyline porteño con fogoneros exteriores.'
      },
      {
        id: 'vr-2-3',
        title: 'Masterplan & Conectividad',
        category: 'aereo',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgaAK_u27yeFmmEvmn9LrzVka9l-OCtB7MejiY_kXKT2PtlnvVEwUPZlSqYvfaC4ieKX71MeZjdYMQvWfZPGHWs6hngfba9GpXTT_kg2uc0jlNUyMGfZ1tgHf9-_jCcpx3ULGJFpVj9fKIzazlaXiLu_a7TdyRUnRSt6PW7_CH59tbp-QSiFYLKbG6L1ICcd9j7cosBCLKVt8ibL_8aSveFHCC38HlKrClwVEtfZWtN62rGxgqMscntw',
        description: 'Estratégica ubicación a 2 cuadras del subte B y ciclo vías.'
      }
    ],
    typologies: [
      {
        id: 'tip-2-1',
        title: 'Studio Loft Funcional',
        rooms: '1 Ambiente Flexible',
        surfaceM2: 38,
        balconyM2: 5,
        floorPlanUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Ax05Y8riVpTRkGPvUlPsXYKnwTU0egIgFy_NoK2cf-5hKk4czhB_a54bL673NXSjvvsUWcaL0MyYlLFEMcAJYfiSS9nocRA9lSTff6Gy0SfqXNhhFfwJP0V7df1UHTS9Y6z7IvwqVv-c2MByLaiHHa-uJKG-tohxddz_zjL33mm9OlLFeKIwEJyqbZa8w_1UwHW7jU0O28dk3la9yNWBWtgO8Rn5BpZxu6UOTsMM3KDrwECVvddqrg',
        description: 'Diseño modular con paneles divisorios corredizos y carpinterías de aluminio anodizado.',
        features: ['Mobiliario inteligente rebatible opcional', 'Cerradura digital biométrica', 'Bajas expensas proyectadas'],
        priceEstimate: 'Desde USD 88,000 (Anticipo 30% + 36 Cuotas)',
        unitsAvailable: 15
      },
      {
        id: 'tip-2-2',
        title: '1 Dormitorio con Terraza',
        rooms: '2 Ambientes',
        surfaceM2: 50,
        balconyM2: 9,
        floorPlanUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Ax05Y8riVpTRkGPvUlPsXYKnwTU0egIgFy_NoK2cf-5hKk4czhB_a54bL673NXSjvvsUWcaL0MyYlLFEMcAJYfiSS9nocRA9lSTff6Gy0SfqXNhhFfwJP0V7df1UHTS9Y6z7IvwqVv-c2MByLaiHHa-uJKG-tohxddz_zjL33mm9OlLFeKIwEJyqbZa8w_1UwHW7jU0O28dk3la9yNWBWtgO8Rn5BpZxu6UOTsMM3KDrwECVvddqrg',
        description: 'Cocina en L con desayunador, living luminoso y dormitorio con placard de piso a techo.',
        features: ['Preinstalación para domótica y cortinas automatizadas', 'Griferías monocomando de bajo consumo'],
        priceEstimate: 'Desde USD 122,000',
        unitsAvailable: 10
      }
    ],
    amenitiesList: [
      {
        id: 'am-2-1',
        title: 'Sky Pool & Bar en Piso 25',
        description: 'Piscina con borde infinito y barra de tragos para propietarios.',
        renderUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATl4nmeyMNVmef3ekZT525cWqAgZi0ezmd_hiElShr58TVq-lWiQIuEeJlX-Li4vyawMmT-2hxRHmK3XaxKSpDmXT602nJsmcXimxanJDW6tyLHThhDDZ4V2_sDzudBVgp4AqWlBlG-nDj-2DQ5XPiqxDdswsFUIUYu0oHIXq7V6DJeZ_W5L9hEG1ObR1ZFxHe5AJ10VFZgkdNMpasSp87xZI6CUT0FVtd1UxHSxg15-OSasP0SwadZQ'
      },
      {
        id: 'am-2-2',
        title: 'Laundry Comunitario Inteligente & Bike Station',
        description: 'Lavandería con app de reserva y taller para bicicletas con lockers.',
        renderUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClvMsO_dw82NPAMbxXFaM4elWpTcr66m-GsmYMPDJ6P5rxQj3xaBAaEkwFI5YjnKB9r24hFmxVTU1dSYpE9CkxJdLNa1cLDlW6-EFOjZ5IH7qJwTze1Om2SJTh0TWKD5sMd0FgcCRTDHdTV4IG-zd89Oe8fMcqJL57jlFxBKWFwwvjAx3IhCUHNMK4v3A_9FZZihHZk5Vze5QqiPTc4hkOwncfXVp3nFTWlTU-O508YDx1P_Zywyihog'
      }
    ]
  },
  {
    id: 'proj-3',
    name: 'Madero Boutique Residences',
    tagline: 'Arquitectura sobria y distinción frente al río en el barrio más exclusivo.',
    phase: 'Fase Final: Terminaciones & Entrega',
    status: 'Sold Out',
    commercialStatus: 'Próxima Entrega',
    unitsSold: 58,
    totalUnits: 60,
    progress: 98,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARWyQpEMRq7DTocExvdapyMoyYuFDeF4a4PERlpFk4hU5AXRDd5OnWddLSmoJsgJ4ab5h08kTA35hjgeZNaVZS019ja0LGPjIJU4R-ckZIgVbsOCIO_u_XYvlUUDvOaPVpNm_N5h1R0LCN-FyYHyTM8aN3qv34vjE_o6e13KcekPZ54UEf-6I8HLuTUAM78Fs0O9mQz3fCesxahzxB5WYAnn3ZQTX5yisG6fymvLhCayHHCmS5RG-74g',
    address: 'Dique 3, Puerto Madero',
    estimatedDelivery: 'Diciembre 2023',
    description: 'Boutique residences en Puerto Madero con acabados de primera línea internacional, pisos de mármol y carpinterías alemanas con triple vidriado hermético.',
    advisorName: 'Esteban Di Meglio',
    advisorPhone: '+54 9 11 6390-1122',
    advisorEmail: 'edimeglio@tierrafirme.com',
    volumetricRenders: [
      {
        id: 'vr-3-1',
        title: 'Fachada Frente al Dique',
        category: 'diurno',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARWyQpEMRq7DTocExvdapyMoyYuFDeF4a4PERlpFk4hU5AXRDd5OnWddLSmoJsgJ4ab5h08kTA35hjgeZNaVZS019ja0LGPjIJU4R-ckZIgVbsOCIO_u_XYvlUUDvOaPVpNm_N5h1R0LCN-FyYHyTM8aN3qv34vjE_o6e13KcekPZ54UEf-6I8HLuTUAM78Fs0O9mQz3fCesxahzxB5WYAnn3ZQTX5yisG6fymvLhCayHHCmS5RG-74g',
        description: 'Revestimiento en piedra natural y curtain wall con visuales al canal navegable.'
      }
    ],
    typologies: [
      {
        id: 'tip-3-1',
        title: 'Residence 2 Suites Frente al Agua',
        rooms: '3 Ambientes en Suite',
        surfaceM2: 138,
        balconyM2: 24,
        floorPlanUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Ax05Y8riVpTRkGPvUlPsXYKnwTU0egIgFy_NoK2cf-5hKk4czhB_a54bL673NXSjvvsUWcaL0MyYlLFEMcAJYfiSS9nocRA9lSTff6Gy0SfqXNhhFfwJP0V7df1UHTS9Y6z7IvwqVv-c2MByLaiHHa-uJKG-tohxddz_zjL33mm9OlLFeKIwEJyqbZa8w_1UwHW7jU0O28dk3la9yNWBWtgO8Rn5BpZxu6UOTsMM3KDrwECVvddqrg',
        description: 'Pisos de mármol Botticino, cocina italiana Dada y griferías Hansgrohe importadas.',
        features: ['Doble suite con vestidores Poliform', 'Cava de vinos climatizada en la unidad', '2 cocheras cubiertas con valet'],
        priceEstimate: 'Última Unidad Disponible: USD 580,000',
        unitsAvailable: 2
      }
    ],
    amenitiesList: [
      {
        id: 'am-3-1',
        title: 'Spa, Sauna & Piscina Climatizada In/Out',
        description: 'Circuito de aguas hidroterapéuticas y salas de masajes privadas.',
        renderUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATl4nmeyMNVmef3ekZT525cWqAgZi0ezmd_hiElShr58TVq-lWiQIuEeJlX-Li4vyawMmT-2hxRHmK3XaxKSpDmXT602nJsmcXimxanJDW6tyLHThhDDZ4V2_sDzudBVgp4AqWlBlG-nDj-2DQ5XPiqxDdswsFUIUYu0oHIXq7V6DJeZ_W5L9hEG1ObR1ZFxHe5AJ10VFZgkdNMpasSp87xZI6CUT0FVtd1UxHSxg15-OSasP0SwadZQ'
      }
    ]
  },
  {
    id: 'proj-4',
    name: 'Distrito Sustentable Palermo',
    tagline: 'Un ecosistema residencial verde con parque central y locales de autor.',
    phase: 'Fase 2: Cimentación & Muros Pantalla',
    status: 'Active Phase 1',
    commercialStatus: 'En Construcción',
    unitsSold: 75,
    totalUnits: 120,
    progress: 45,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgaAK_u27yeFmmEvmn9LrzVka9l-OCtB7MejiY_kXKT2PtlnvVEwUPZlSqYvfaC4ieKX71MeZjdYMQvWfZPGHWs6hngfba9GpXTT_kg2uc0jlNUyMGfZ1tgHf9-_jCcpx3ULGJFpVj9fKIzazlaXiLu_a7TdyRUnRSt6PW7_CH59tbp-QSiFYLKbG6L1ICcd9j7cosBCLKVt8ibL_8aSveFHCC38HlKrClwVEtfZWtN62rGxgqMscntw',
    address: 'Av. Juan B. Justo 2800, Palermo',
    estimatedDelivery: 'Noviembre 2025',
    description: 'Distrito sustentable con certificación LEED, paneles solares para áreas comunes, amplios espacios verdes de 1.200m², locales comerciales y conectividad estratégica.',
    advisorName: 'Carolina Rossi',
    advisorPhone: '+54 9 11 3109-8877',
    advisorEmail: 'crossi@tierrafirme.com',
    volumetricRenders: [
      {
        id: 'vr-4-1',
        title: 'Masterplan & Parque Interior',
        category: 'diurno',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgaAK_u27yeFmmEvmn9LrzVka9l-OCtB7MejiY_kXKT2PtlnvVEwUPZlSqYvfaC4ieKX71MeZjdYMQvWfZPGHWs6hngfba9GpXTT_kg2uc0jlNUyMGfZ1tgHf9-_jCcpx3ULGJFpVj9fKIzazlaXiLu_a7TdyRUnRSt6PW7_CH59tbp-QSiFYLKbG6L1ICcd9j7cosBCLKVt8ibL_8aSveFHCC38HlKrClwVEtfZWtN62rGxgqMscntw',
        description: 'Diseño paisajístico con especies nativas y recirculación de aguas grises para riego.'
      }
    ],
    typologies: [
      {
        id: 'tip-4-1',
        title: '2 Ambientes con Jardín Propio',
        rooms: '2 Ambientes Planta Baja',
        surfaceM2: 62,
        balconyM2: 28,
        floorPlanUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Ax05Y8riVpTRkGPvUlPsXYKnwTU0egIgFy_NoK2cf-5hKk4czhB_a54bL673NXSjvvsUWcaL0MyYlLFEMcAJYfiSS9nocRA9lSTff6Gy0SfqXNhhFfwJP0V7df1UHTS9Y6z7IvwqVv-c2MByLaiHHa-uJKG-tohxddz_zjL33mm9OlLFeKIwEJyqbZa8w_1UwHW7jU0O28dk3la9yNWBWtgO8Rn5BpZxu6UOTsMM3KDrwECVvddqrg',
        description: 'Jardín privado con césped natural, galería semicubierta y parrilla propia.',
        features: ['Jardín privado de 28m²', 'Calefacción por piso radiante con caldera individual'],
        priceEstimate: 'Desde USD 165,000',
        unitsAvailable: 8
      },
      {
        id: 'tip-4-2',
        title: '3 Ambientes Dúplex Terraza',
        rooms: '3 Ambientes Dúplex',
        surfaceM2: 105,
        balconyM2: 35,
        floorPlanUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Ax05Y8riVpTRkGPvUlPsXYKnwTU0egIgFy_NoK2cf-5hKk4czhB_a54bL673NXSjvvsUWcaL0MyYlLFEMcAJYfiSS9nocRA9lSTff6Gy0SfqXNhhFfwJP0V7df1UHTS9Y6z7IvwqVv-c2MByLaiHHa-uJKG-tohxddz_zjL33mm9OlLFeKIwEJyqbZa8w_1UwHW7jU0O28dk3la9yNWBWtgO8Rn5BpZxu6UOTsMM3KDrwECVvddqrg',
        description: 'Doble altura en estar comedor con gran ventanal al parque central.',
        features: ['Estar comedor en doble altura', 'Terraza propia con pérgola de madera'],
        priceEstimate: 'Desde USD 245,000',
        unitsAvailable: 5
      }
    ],
    amenitiesList: [
      {
        id: 'am-4-1',
        title: 'Parque Central de 1.200 m² & Huertas',
        description: 'Pulmón verde privado con senderos aeróbicos y huerta orgánica comunitaria.',
        renderUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATl4nmeyMNVmef3ekZT525cWqAgZi0ezmd_hiElShr58TVq-lWiQIuEeJlX-Li4vyawMmT-2hxRHmK3XaxKSpDmXT602nJsmcXimxanJDW6tyLHThhDDZ4V2_sDzudBVgp4AqWlBlG-nDj-2DQ5XPiqxDdswsFUIUYu0oHIXq7V6DJeZ_W5L9hEG1ObR1ZFxHe5AJ10VFZgkdNMpasSp87xZI6CUT0FVtd1UxHSxg15-OSasP0SwadZQ'
      }
    ]
  }
];

export const INITIAL_MILESTONES: ConstructionMilestone[] = [
  {
    id: 'm-1',
    projectId: 'proj-1',
    title: 'Estructura Nivel 5',
    month: 'Octubre 2023',
    phaseStatus: 'Fase Actual',
    progressPercentage: 68,
    quote: 'Se ha completado el colado de losa del quinto nivel y comenzamos con la preparación de cimbra para columnas del sexto nivel. Excelente ritmo de avance.',
    authorName: 'Ing. Roberto Sánchez',
    authorRole: 'Dir. de Obra',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcaC2IrPvxkrLBSJszPUrW9iM2axLGxSCdzaNcIu3bl4ytILeSJEs4ki4BJrMjUQqXQ6AVyO3JzPwT2sTakIsD7ba8x7ss3r0IE9JLV-4LSc6W1CG5Ge7Sclojc1puQjReP5MEO1yDlJAOxPemlFa5Bj4lUNwDfd8-doUca5qP3h4N5JLA5WETT_3GmfTVwRXVahzVJO-5gEc6OXh4K9r4wcrOexRm2wQ6OSx3Hjb3nNCezXw-t6JLfw'
  },
  {
    id: 'm-2',
    projectId: 'proj-1',
    title: 'Cimentación Profunda',
    month: 'Agosto 2023',
    phaseStatus: 'Completado',
    progressPercentage: 100,
    quote: 'Conclusión exitosa de la etapa de cimentación y muros de contención subterráneos. Terreno estabilizado y listo para desplante estructural.',
    authorName: 'Ing. Roberto Sánchez',
    authorRole: 'Dir. de Obra',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOHsgaXTAtYFrvIcdDzyGeP9pwFtkaQkfBRrDkGy3TFjq8oZWFctKweRqkdXgrVIor8puZW8LRmtarOzeCQXscs0Hecp82D03wPTQaKmmNfC6egcQaxoEnnlHG28329lPU3j9esaeADOOrbWNCdvLxyhheUTjbL07fpDkSNKlR0bgQsHTCg_H0jdy1KgvkUXM4HYSSgV6VMRLmk8b-uhSRHWgrfzH5fvnfS5-bruQhlpu26bh1CoOp3Q'
  },
  {
    id: 'm-3',
    projectId: 'proj-1',
    title: 'Excavación y Movimiento de Suelos',
    month: 'Junio 2023',
    phaseStatus: 'Completado',
    progressPercentage: 100,
    quote: 'Trabajos de terracería y excavación profunda finalizados conforme a los estudios topográficos y mecánica de suelos certificados.',
    authorName: 'Ing. Roberto Sánchez',
    authorRole: 'Dir. de Obra',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Y5xc4zS34-BhGyu2H5g9OH4fH1iyYtUCjwxXgHU5_I9P9VEdMI3zRSu9dHRsLYMW0i9N_Wu0kh3k_eR6788gdn9a2FE-b6P6Zo1BFUI5ZR3kEtU9gmH1fY8-R8DJdPhmm6IF5p9ctYP16pGw4ftPXtMBb3i3cGwo299_5_5aDsRshJWyg3sThwl62b-dySs2787HGQUwRQkrkkOHIIdJ8pkWRrHAUuFWNvNnFZmPEyTxtz_bmbIsVA'
  }
];

export const INITIAL_UNITS: UnitDetail[] = [
  {
    id: 'unit-4b',
    unitNumber: 'Unidad 4° B',
    complexName: 'Complejo Terrazas Park',
    projectId: 'proj-1',
    address: 'Av. del Libertador 1234, CABA',
    status: 'En Construcción',
    surfaceM2: 120,
    balconySurfaceM2: 18,
    orientation: 'Nororiente',
    rooms: 4,
    bedrooms: '3 + Dependencia',
    bathrooms: 2.5,
    parking: 'N° 12 (Nivel 1)',
    storage: 'Baulera B-04',
    assignedUserId: 'usr-1',
    assignedUserName: 'Juan Pérez',
    assignedUserEmail: 'juan.perez@email.com',
    mainRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Dg5-GoB6fJxtvSnd4FBKz6U5WEwu_1v1CWDnnwmcS4_Rww1AvyLXO5vB8z0PaSOsVUZrc5RK4pgeTQEwwOVlNm-KRso8Or1-ydLLhMSUPQmkrCF5QsAm3lGLuU8mjgE-S9TIBGYog8exCNoyW1kJqhmVYoCrIUhb9K47zAB7gnvSJ3kF2Yv1JesulYLzqF83qlBeBtbuKDqbH0Wznri32nprrfd9Sz3TCCbeErekaEkN2az8CodAyQ',
    livingRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATl4nmeyMNVmef3ekZT525cWqAgZi0ezmd_hiElShr58TVq-lWiQIuEeJlX-Li4vyawMmT-2hxRHmK3XaxKSpDmXT602nJsmcXimxanJDW6tyLHThhDDZ4V2_sDzudBVgp4AqWlBlG-nDj-2DQ5XPiqxDdswsFUIUYu0oHIXq7V6DJeZ_W5L9hEG1ObR1ZFxHe5AJ10VFZgkdNMpasSp87xZI6CUT0FVtd1UxHSxg15-OSasP0SwadZQ',
    masterBedroomRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcsLOpHMxnDQlp2HsHkfw91PLU8vDJlDejjLWrf5zs0mkOGXAroStcYaw1bfYej9nAXPG-hTGGkvE13ghzCTn3-Op1Y67nu2_lWDpMFEQz2JX-kqyNjk7vRgq2adAscn36sxv4Tg9xfxOAXScDrXOgexiiJFKMrqaqKDGw4YIZqoPwrq-BROUkQVK5igq8BveOv-3oVr2fVK98BonVs80v2hUBTtVg6VEeE2ey8y1devVu_aFHSIuApw',
    kitchenRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClvMsO_dw82NPAMbxXFaM4elWpTcr66m-GsmYMPDJ6P5rxQj3xaBAaEkwFI5YjnKB9r24hFmxVTU1dSYpE9CkxJdLNa1cLDlW6-EFOjZ5IH7qJwTze1Om2SJTh0TWKD5sMd0FgcCRTDHdTV4IG-zd89Oe8fMcqJL57jlFxBKWFwwvjAx3IhCUHNMK4v3A_9FZZihHZk5Vze5QqiPTc4hkOwncfXVp3nFTWlTU-O508YDx1P_Zywyihog',
    blueprintPdfUrl: '#plano-arquitectonico-4b.pdf',
    electricalPdfUrl: '#instalaciones-electricas-4b.pdf',
    hydraulicPdfUrl: '#instalaciones-hidraulicas-4b.pdf',
    deedPdfUrl: '#boleto-compra-4b.pdf'
  },
  {
    id: 'unit-401',
    unitNumber: 'Torre A - 401',
    complexName: 'Torre Altura Smart Living',
    projectId: 'proj-2',
    address: 'Calle Corrientes 4500, Villa Crespo',
    status: 'En Construcción',
    surfaceM2: 135,
    balconySurfaceM2: 16,
    orientation: 'Norte',
    rooms: 4,
    bedrooms: '3 en Suite',
    bathrooms: 3,
    parking: 'Nivel 1 - C12',
    storage: 'Baulera A-11',
    assignedUserId: 'usr-2',
    assignedUserName: 'Carlos Mendoza',
    assignedUserEmail: 'carlos.m@example.com',
    mainRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWq6C84h81Xhr9fnBPMuddOo4JrFXjqer8r7LrepnpTDv_ikHtvjlkBIychnGbFMSROL-l7EkiXp6IS1IG0P__mzveajRcAJw9saNsUEaAjPJYYAN8_9w4vKd1-i-U-0ZpzyZufsgBMevIt2TDu2Ibh63CpwKQNzlAySv-QWuokpuZXBIQ3UEmz-VfniAutQL8CgpnByF-Ex_6Ttiz4MO37jcgkJ5uHELrlzJwRBOnuIaehjrfRYfZgQ',
    livingRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATl4nmeyMNVmef3ekZT525cWqAgZi0ezmd_hiElShr58TVq-lWiQIuEeJlX-Li4vyawMmT-2hxRHmK3XaxKSpDmXT602nJsmcXimxanJDW6tyLHThhDDZ4V2_sDzudBVgp4AqWlBlG-nDj-2DQ5XPiqxDdswsFUIUYu0oHIXq7V6DJeZ_W5L9hEG1ObR1ZFxHe5AJ10VFZgkdNMpasSp87xZI6CUT0FVtd1UxHSxg15-OSasP0SwadZQ',
    masterBedroomRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcsLOpHMxnDQlp2HsHkfw91PLU8vDJlDejjLWrf5zs0mkOGXAroStcYaw1bfYej9nAXPG-hTGGkvE13ghzCTn3-Op1Y67nu2_lWDpMFEQz2JX-kqyNjk7vRgq2adAscn36sxv4Tg9xfxOAXScDrXOgexiiJFKMrqaqKDGw4YIZqoPwrq-BROUkQVK5igq8BveOv-3oVr2fVK98BonVs80v2hUBTtVg6VEeE2ey8y1devVu_aFHSIuApw',
    kitchenRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClvMsO_dw82NPAMbxXFaM4elWpTcr66m-GsmYMPDJ6P5rxQj3xaBAaEkwFI5YjnKB9r24hFmxVTU1dSYpE9CkxJdLNa1cLDlW6-EFOjZ5IH7qJwTze1Om2SJTh0TWKD5sMd0FgcCRTDHdTV4IG-zd89Oe8fMcqJL57jlFxBKWFwwvjAx3IhCUHNMK4v3A_9FZZihHZk5Vze5QqiPTc4hkOwncfXVp3nFTWlTU-O508YDx1P_Zywyihog',
    blueprintPdfUrl: '#plano-arquitectonico-401.pdf',
    electricalPdfUrl: '#instalaciones-electricas-401.pdf',
    hydraulicPdfUrl: '#instalaciones-hidraulicas-401.pdf',
    deedPdfUrl: '#boleto-compra-401.pdf'
  },
  {
    id: 'unit-402',
    unitNumber: 'Unidad 402 - Torre B',
    complexName: 'Madero Boutique Residences',
    projectId: 'proj-3',
    address: 'Dique 4, Puerto Madero, CABA',
    status: 'Entregado',
    surfaceM2: 125,
    balconySurfaceM2: 24,
    orientation: 'Este',
    rooms: 3,
    bedrooms: '2 + Estudio',
    bathrooms: 2.5,
    parking: 'Cochera 402 (Nivel 2)',
    storage: 'Baulera 402',
    assignedUserId: 'usr-7',
    assignedUserName: 'Valentina Gómez',
    assignedUserEmail: 'valen.gomez@gmail.com',
    mainRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATl4nmeyMNVmef3ekZT525cWqAgZi0ezmd_hiElShr58TVq-lWiQIuEeJlX-Li4vyawMmT-2hxRHmK3XaxKSpDmXT602nJsmcXimxanJDW6tyLHThhDDZ4V2_sDzudBVgp4AqWlBlG-nDj-2DQ5XPiqxDdswsFUIUYu0oHIXq7V6DJeZ_W5L9hEG1ObR1ZFxHe5AJ10VFZgkdNMpasSp87xZI6CUT0FVtd1UxHSxg15-OSasP0SwadZQ',
    livingRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATl4nmeyMNVmef3ekZT525cWqAgZi0ezmd_hiElShr58TVq-lWiQIuEeJlX-Li4vyawMmT-2hxRHmK3XaxKSpDmXT602nJsmcXimxanJDW6tyLHThhDDZ4V2_sDzudBVgp4AqWlBlG-nDj-2DQ5XPiqxDdswsFUIUYu0oHIXq7V6DJeZ_W5L9hEG1ObR1ZFxHe5AJ10VFZgkdNMpasSp87xZI6CUT0FVtd1UxHSxg15-OSasP0SwadZQ',
    masterBedroomRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcsLOpHMxnDQlp2HsHkfw91PLU8vDJlDejjLWrf5zs0mkOGXAroStcYaw1bfYej9nAXPG-hTGGkvE13ghzCTn3-Op1Y67nu2_lWDpMFEQz2JX-kqyNjk7vRgq2adAscn36sxv4Tg9xfxOAXScDrXOgexiiJFKMrqaqKDGw4YIZqoPwrq-BROUkQVK5igq8BveOv-3oVr2fVK98BonVs80v2hUBTtVg6VEeE2ey8y1devVu_aFHSIuApw',
    kitchenRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClvMsO_dw82NPAMbxXFaM4elWpTcr66m-GsmYMPDJ6P5rxQj3xaBAaEkwFI5YjnKB9r24hFmxVTU1dSYpE9CkxJdLNa1cLDlW6-EFOjZ5IH7qJwTze1Om2SJTh0TWKD5sMd0FgcCRTDHdTV4IG-zd89Oe8fMcqJL57jlFxBKWFwwvjAx3IhCUHNMK4v3A_9FZZihHZk5Vze5QqiPTc4hkOwncfXVp3nFTWlTU-O508YDx1P_Zywyihog',
    blueprintPdfUrl: '#plano-arquitectonico-402.pdf',
    electricalPdfUrl: '#instalaciones-electricas-402.pdf',
    hydraulicPdfUrl: '#instalaciones-hidraulicas-402.pdf',
    deedPdfUrl: '#boleto-compra-402.pdf'
  },
  {
    id: 'unit-villa-12',
    unitNumber: 'Villa 12',
    complexName: 'Complejo Terrazas Park',
    projectId: 'proj-1',
    address: 'Av. del Libertador 1234, CABA',
    status: 'En Terminaciones',
    surfaceM2: 185,
    balconySurfaceM2: 45,
    orientation: 'Norte',
    rooms: 5,
    bedrooms: '4 en Suite',
    bathrooms: 4,
    parking: 'Nivel 2 - C45',
    storage: 'Baulera V-12',
    assignedUserId: 'usr-4',
    assignedUserName: 'Roberto Silva',
    assignedUserEmail: 'rsilva.invest@mail.com',
    mainRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgaAK_u27yeFmmEvmn9LrzVka9l-OCtB7MejiY_kXKT2PtlnvVEwUPZlSqYvfaC4ieKX71MeZjdYMQvWfZPGHWs6hngfba9GpXTT_kg2uc0jlNUyMGfZ1tgHf9-_jCcpx3ULGJFpVj9fKIzazlaXiLu_a7TdyRUnRSt6PW7_CH59tbp-QSiFYLKbG6L1ICcd9j7cosBCLKVt8ibL_8aSveFHCC38HlKrClwVEtfZWtN62rGxgqMscntw',
    livingRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATl4nmeyMNVmef3ekZT525cWqAgZi0ezmd_hiElShr58TVq-lWiQIuEeJlX-Li4vyawMmT-2hxRHmK3XaxKSpDmXT602nJsmcXimxanJDW6tyLHThhDDZ4V2_sDzudBVgp4AqWlBlG-nDj-2DQ5XPiqxDdswsFUIUYu0oHIXq7V6DJeZ_W5L9hEG1ObR1ZFxHe5AJ10VFZgkdNMpasSp87xZI6CUT0FVtd1UxHSxg15-OSasP0SwadZQ',
    masterBedroomRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcsLOpHMxnDQlp2HsHkfw91PLU8vDJlDejjLWrf5zs0mkOGXAroStcYaw1bfYej9nAXPG-hTGGkvE13ghzCTn3-Op1Y67nu2_lWDpMFEQz2JX-kqyNjk7vRgq2adAscn36sxv4Tg9xfxOAXScDrXOgexiiJFKMrqaqKDGw4YIZqoPwrq-BROUkQVK5igq8BveOv-3oVr2fVK98BonVs80v2hUBTtVg6VEeE2ey8y1devVu_aFHSIuApw',
    kitchenRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClvMsO_dw82NPAMbxXFaM4elWpTcr66m-GsmYMPDJ6P5rxQj3xaBAaEkwFI5YjnKB9r24hFmxVTU1dSYpE9CkxJdLNa1cLDlW6-EFOjZ5IH7qJwTze1Om2SJTh0TWKD5sMd0FgcCRTDHdTV4IG-zd89Oe8fMcqJL57jlFxBKWFwwvjAx3IhCUHNMK4v3A_9FZZihHZk5Vze5QqiPTc4hkOwncfXVp3nFTWlTU-O508YDx1P_Zywyihog',
    blueprintPdfUrl: '#plano-arquitectonico-villa12.pdf',
    electricalPdfUrl: '#instalaciones-electricas-villa12.pdf',
    hydraulicPdfUrl: '#instalaciones-hidraulicas-villa12.pdf',
    deedPdfUrl: '#boleto-compra-villa12.pdf'
  },
  {
    id: 'unit-ph-8a',
    unitNumber: 'Penthouse 8° A',
    complexName: 'Distrito Sustentable Palermo',
    projectId: 'proj-4',
    address: 'Av. Juan B. Justo 2800, Palermo',
    status: 'Disponible',
    surfaceM2: 160,
    balconySurfaceM2: 50,
    orientation: 'Nororiente',
    rooms: 4,
    bedrooms: '3 en Suite + Rooftop',
    bathrooms: 3.5,
    parking: 'Cochera Doble N° 08',
    storage: 'Baulera PH-08',
    mainRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWFijFffOMoKSMJBMsG5cmaTF1iOjssbmqQrg63jSX68V7uoQJXO4hZ9qfjdglQaueQkh975n1XL1obP4CNWbzdCMHJR_2FsLD6yc2iYjheN6gs7rXTUStscXJvfrv1RNM9Pm9kKNq7BSbZUbZJF4qEGT-Pe9mw3N3IdLKD5QnekITnMo_rgTdkwVfq6bI3WZBnToiFutAxAV25Ak1jaR-yglDM9QsQ13JEwA4wIlIMuoTkY1plyqzrg',
    livingRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATl4nmeyMNVmef3ekZT525cWqAgZi0ezmd_hiElShr58TVq-lWiQIuEeJlX-Li4vyawMmT-2hxRHmK3XaxKSpDmXT602nJsmcXimxanJDW6tyLHThhDDZ4V2_sDzudBVgp4AqWlBlG-nDj-2DQ5XPiqxDdswsFUIUYu0oHIXq7V6DJeZ_W5L9hEG1ObR1ZFxHe5AJ10VFZgkdNMpasSp87xZI6CUT0FVtd1UxHSxg15-OSasP0SwadZQ',
    masterBedroomRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcsLOpHMxnDQlp2HsHkfw91PLU8vDJlDejjLWrf5zs0mkOGXAroStcYaw1bfYej9nAXPG-hTGGkvE13ghzCTn3-Op1Y67nu2_lWDpMFEQz2JX-kqyNjk7vRgq2adAscn36sxv4Tg9xfxOAXScDrXOgexiiJFKMrqaqKDGw4YIZqoPwrq-BROUkQVK5igq8BveOv-3oVr2fVK98BonVs80v2hUBTtVg6VEeE2ey8y1devVu_aFHSIuApw',
    kitchenRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClvMsO_dw82NPAMbxXFaM4elWpTcr66m-GsmYMPDJ6P5rxQj3xaBAaEkwFI5YjnKB9r24hFmxVTU1dSYpE9CkxJdLNa1cLDlW6-EFOjZ5IH7qJwTze1Om2SJTh0TWKD5sMd0FgcCRTDHdTV4IG-zd89Oe8fMcqJL57jlFxBKWFwwvjAx3IhCUHNMK4v3A_9FZZihHZk5Vze5QqiPTc4hkOwncfXVp3nFTWlTU-O508YDx1P_Zywyihog',
    blueprintPdfUrl: '#plano-arquitectonico-ph8a.pdf',
    electricalPdfUrl: '#instalaciones-electricas-ph8a.pdf',
    hydraulicPdfUrl: '#instalaciones-hidraulicas-ph8a.pdf',
    deedPdfUrl: '#boleto-compra-ph8a.pdf'
  }
];

export const INITIAL_UNIT_DETAILS: Record<string, UnitDetail> = INITIAL_UNITS.reduce(
  (acc, unit) => {
    acc[unit.unitNumber] = unit;
    return acc;
  },
  {} as Record<string, UnitDetail>
);

export const INITIAL_UPLOADS: MediaUploadItem[] = [
  {
    id: 'up-1',
    fileName: 'Interior_Lobby_Final_v2.jpg',
    type: 'render',
    size: '12.4 MB',
    timestamp: 'Hoy, 10:23 AM',
    uploadedBy: 'Arq. Mariana Rossi',
    uploadedByRole: 'Arquitecto',
    status: 'synced',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcsLOpHMxnDQlp2HsHkfw91PLU8vDJlDejjLWrf5zs0mkOGXAroStcYaw1bfYej9nAXPG-hTGGkvE13ghzCTn3-Op1Y67nu2_lWDpMFEQz2JX-kqyNjk7vRgq2adAscn36sxv4Tg9xfxOAXScDrXOgexiiJFKMrqaqKDGw4YIZqoPwrq-BROUkQVK5igq8BveOv-3oVr2fVK98BonVs80v2hUBTtVg6VEeE2ey8y1devVu_aFHSIuApw',
    complexName: 'Torre Alta - Phase 1'
  },
  {
    id: 'up-2',
    fileName: 'Structural_Plan_Level4.pdf',
    type: 'blueprint',
    size: '4.2 MB',
    timestamp: 'Ayer, 15:45',
    uploadedBy: 'Ing. Roberto Sánchez',
    uploadedByRole: 'Director de Obra',
    status: 'synced',
    url: '#structural-plan.pdf',
    complexName: 'Complejo Terrazas'
  },
  {
    id: 'up-3',
    fileName: 'Site_Progress_Week42.jpg',
    type: 'progress',
    size: '8.1 MB',
    timestamp: 'Hace 15 min',
    uploadedBy: 'Ing. Roberto Sánchez',
    uploadedByRole: 'Director de Obra',
    status: 'syncing',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUhSMa0eZ2_XUJvMk4q3cjo9R-nk2aWFONnZy7ap9PKAfcc0qkvbVi3A8VBzU838PUz56s7aqHcpV5Wh7kbHhQiY3MRhebveTga19Uxw4PMvXIxIcjow9Tie5EOCYq4eNBCexq_V1kDUTc9xO_EqCHu6uf6xRm5NmZe29r3aNDrAG-2W87Qp7QQGjKPapB_RPzEjjG7GuViS7Qcw1SgYNAcPYl32o_tw5OyXQsLsv4I0gnsKOYpirN1w',
    complexName: 'Complejo Terrazas'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-1',
    action: 'Carga de Avance de Obra',
    details: 'Subió foto y reporte de avance para "Estructura Nivel 5" en Complejo Terrazas',
    staffName: 'Ing. Roberto Sánchez',
    staffRole: 'Director de Obra',
    timestamp: '28 Octubre 2023, 11:20 AM',
    entityType: 'media'
  },
  {
    id: 'aud-2',
    action: 'Creación de Usuario Propietario',
    details: 'Dio de alta a Roberto Silva asignado a Unidad Villa 12 con token TF-9482',
    staffName: 'Laura Martinez',
    staffRole: 'Administración',
    timestamp: '18 Octubre 2023, 16:40 PM',
    entityType: 'user'
  },
  {
    id: 'aud-3',
    action: 'Actualización de Porcentaje de Avance',
    details: 'Modificó avance global de Terrazas de 75% a 82%',
    staffName: 'Ing. Roberto Sánchez',
    staffRole: 'Director de Obra',
    timestamp: '15 Octubre 2023, 09:15 AM',
    entityType: 'project'
  },
  {
    id: 'aud-4',
    action: 'Carga de Renders de Interior',
    details: 'Cargó "Interior_Lobby_Final_v2.jpg" en Torre Alta',
    staffName: 'Arq. Mariana Rossi',
    staffRole: 'Arquitecto',
    timestamp: '14 Octubre 2023, 14:30 PM',
    entityType: 'media'
  }
];
