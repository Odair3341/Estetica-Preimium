import { Service, Appointment, UserProfile, Product, FinancialEntry, CashRegister, Procedure, Client, PurchaseHistory } from './types';

export const CURRENT_USER: UserProfile = {
  name: "Rosana Turci",
  email: "contato@rosanaturci.com",
  phone: "(11) 98765-4321",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWVMLEGqFYnpZ0Uu8gzj7a6Ls8PcB7wjpmA2FSO5Sj1d7nxXm0wSNE3dhgprG4NRNYEoO8JffmRytw-hSTmz2CIyPNX3VVPVgZoNUBku2e3YBBZiaXua5ktvvjupKfRbpv0gXOc-cwDAtUKGgq77TrugcTkPjlOvWqJqtjn7YA7yPZfhQDd6m6uK-sgOUrSbPn47PrMQwitvzyfz04Sin_w4UWySHMPkrXKxC1viV8CeO-qKaYByEpUvrCvXDS4T258i6O2gj9FtM",
  loyaltyPoints: 850
};

export const UPCOMING_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    serviceName: 'Limpeza de Pele Profunda',
    professionalName: 'Dr. Ana Costa',
    date: 'Amanhã',
    time: '10:00',
    status: 'upcoming',
    serviceTypeIcon: 'calendar_month',
    price: 150.00
  },
  {
    id: '2',
    serviceName: 'Retoque de Botox',
    professionalName: 'Dr. Ana Costa',
    date: '28 de Julho',
    time: '15:30',
    status: 'upcoming',
    serviceTypeIcon: 'auto_fix_high',
    price: 1200.00
  }
];

export const PAST_APPOINTMENTS: Appointment[] = [
  {
    id: '3',
    serviceName: 'Massagem Relaxante',
    professionalName: 'Carlos Silva',
    date: '15 de Junho, 2024',
    time: '14:00',
    status: 'completed',
    serviceTypeIcon: 'spa',
    price: 120.00
  },
  {
    id: '4',
    serviceName: 'Peeling Químico',
    professionalName: 'Dr. Ana Costa',
    date: '02 de Maio, 2024',
    time: '11:00',
    status: 'completed',
    serviceTypeIcon: 'science',
    price: 250.00
  },
  {
    id: '5',
    serviceName: 'Drenagem Linfática',
    professionalName: 'Carlos Silva',
    date: '20 de Abril, 2024',
    time: '09:00',
    status: 'completed',
    serviceTypeIcon: 'spa',
    price: 180.00
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Limpeza de Pele Profunda',
    duration: 60,
    price: 150,
    category: 'Facial',
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuASadbb2Z4AX_B46VspUxnt8qIos_qIzEWvopf-t367MDm3cWvHiOEt-qeGo3cSDsDBkwByNRFix5J75BQO9Zjoj6bnFqoXqFISOIndpwlw5cj0VMGM8-ejhecBVF0DxgFOkAtu2y_hwIYxTCZa3FZwZ-KO8z8qhe8OQwJvgt1DEYOyO2PU22_1Tg0RGN2jCzUTZg1dw3Ri4SSLyhiwvhHxSIl1UqT8Ji7udMMZ4pjMYgh_yUIQ2TFAEN0DgVDC7eJ-h9U5c8k5z0s"
  },
  {
    id: 's2',
    name: 'Massagem Relaxante',
    duration: 50,
    price: 120,
    category: 'Corporal',
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRHJw7xefsLYTKgj3wxn1ELGrs7dPqssEgcw2Kgdi3l5zJj39iGK-1BUnNdNc2aOjL7vf4SKQguQK_fAJWc5LNuM0AfCnpA8tNb8PDCZo-AuE37vZ473g3ivoMkTnPI7Wo99PoG_6WqGvFN055h4vqYYXFjznTpKSJ-WGZagJBwrNJj3BvEXo46r4TNtZ4gKEQyB-FwAz22L5OPU1TbL17-40cCuYL9tfQ5LD3wY-lnub1Pqixw2L8FxOqDWu2o6xkbcsGHvKv68s"
  },
  {
    id: 's3',
    name: 'Drenagem Linfática',
    duration: 60,
    price: 180,
    category: 'Corporal',
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbHLIQAAFM3Rq1a8G3VDvNWzW38CKg2KmRXVzEoWBtaR9gRhuee3RReA45f8E9g9W-NNpM532zu5IKA78tshjL0_cbmsT0WAF9IrYGg1rTRab1V-hY0jGkmFA4KpEnIYSX-u3j2kQi4CNnpOJ8A-q8LNCybe2O4oxL_PuZjL4yTJMUWSXkkSYDDucHSl5JHp346PcGGVZqemKanDFFXQONZ9Bg1QpKtemAugTTg4BTZr-NEPp0AbK4wucTpbC87WSdtjbzbPMcsHo"
  },
  {
    id: 's4',
    name: 'Manicure & Pedicure',
    duration: 90,
    price: 90,
    category: 'Corporal',
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY4x84B34osOvCTuUosL4luLxtkMYMtCIvKa4k846w19cBDDSOrQEzN08O8Gth4CrjwXFwE22RVofQHW2el1BRQsC4BXbF8pSL_mBhH0XZSyXgUU0AOb4wRZM4abc9uvPPpuFV_FyRDb--WRiTrXAkC_cXKnaTZCwLvl_7suKd_yOjC6arZNbF1J2uXjVaZ2Q7G3Z37xSmFpBbTIZ5JC2M7UJCRp1L2loU1xHYfgQRWdrvaTZz2zr8EOdTimFOFqzFyGCjviQ-Yyo"
  },
  {
    id: 's5',
    name: 'Hidratação Facial',
    duration: 45,
    price: 120,
    category: 'Facial',
    imageUrl: ''
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Vestido Midi Floral',
    price: 299.90,
    category: 'Vestidos',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2000&auto=format&fit=crop',
    isNew: true
  },
  {
    id: 'p2',
    name: 'Blusa de Seda Off-white',
    price: 159.90,
    category: 'Blusas',
    imageUrl: 'https://images.unsplash.com/photo-1604176354204-946877562889?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'p3',
    name: 'Calça Alfaiataria Preta',
    price: 249.00,
    category: 'Calças',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'p4',
    name: 'Conjunto Moletom Rosa',
    price: 350.00,
    category: 'Conjuntos',
    imageUrl: 'https://images.unsplash.com/photo-1614676471928-2ed0ad486148?q=80&w=2000&auto=format&fit=crop',
    isNew: true
  },
  {
    id: 'p5',
    name: 'Camisa Linho Bege',
    price: 189.90,
    category: 'Blusas',
    imageUrl: 'https://images.unsplash.com/photo-1551163943-3f6a29e3945a?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'p6',
    name: 'Serum Facial Vitamina C',
    price: 99.90,
    category: 'Cosméticos',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2000&auto=format&fit=crop'
  }
];

export const FINANCIAL_ENTRIES: FinancialEntry[] = [
  {
    id: 'f1',
    type: 'income',
    category: 'Serviços',
    description: 'Limpeza de Pele Profunda',
    amount: 150.00,
    date: '2024-07-15',
    source: 'esthetic'
  },
  {
    id: 'f2',
    type: 'income',
    category: 'Produtos',
    description: 'Venda de Vestido Midi Floral',
    amount: 299.90,
    date: '2024-07-15',
    source: 'store'
  },
  {
    id: 'f3',
    type: 'expense',
    category: 'Material',
    description: 'Compra de produtos para limpeza facial',
    amount: 85.50,
    date: '2024-07-14',
    source: 'esthetic'
  },
  {
    id: 'f4',
    type: 'expense',
    category: 'Estoque',
    description: 'Compra de novos produtos para loja',
    amount: 1200.00,
    date: '2024-07-10',
    source: 'store'
  }
];

export const CASH_REGISTERS: CashRegister[] = [
  {
    id: 'c1',
    date: '2024-07-15',
    openingBalance: 1500.00,
    closingBalance: 1864.40,
    totalIncome: 449.90,
    totalExpenses: 85.50,
    entries: [
      {
        id: 'f1',
        type: 'income',
        category: 'Serviços',
        description: 'Limpeza de Pele Profunda',
        amount: 150.00,
        date: '2024-07-15',
        source: 'esthetic'
      },
      {
        id: 'f2',
        type: 'income',
        category: 'Produtos',
        description: 'Venda de Vestido Midi Floral',
        amount: 299.90,
        date: '2024-07-15',
        source: 'store'
      },
      {
        id: 'f3',
        type: 'expense',
        category: 'Material',
        description: 'Compra de produtos para limpeza facial',
        amount: 85.50,
        date: '2024-07-14',
        source: 'esthetic'
      }
    ]
  }
];

export const PROCEDURES: Procedure[] = [
  {
    id: 'proc1',
    name: 'Limpeza de Pele Profunda',
    description: 'Tratamento completo para limpeza e revitalização da pele',
    price: 150.00,
    duration: 60,
    category: 'Rosto'
  },
  {
    id: 'proc2',
    name: 'Massagem Relaxante',
    description: 'Massagem corporal completa para relaxamento muscular',
    price: 120.00,
    duration: 50,
    category: 'Corporal'
  },
  {
    id: 'proc3',
    name: 'Depilação Completa',
    description: 'Depilação com cera quente e produtos especiais',
    price: 80.00,
    duration: 30,
    category: 'Corporal'
  }
];

export const CLIENTS: Client[] = [
  {
    id: 'cli1',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '(11) 99999-9999',
    birthDate: '1990-05-15',
    address: 'Rua das Flores, 123',
    loyaltyPoints: 150,
    registrationDate: '2024-01-15'
  },
  {
    id: 'cli2',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '(11) 98888-8888',
    birthDate: '1985-10-22',
    address: 'Av. Paulista, 1000',
    loyaltyPoints: 85,
    registrationDate: '2024-03-20'
  },
  {
    id: 'cli3',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    phone: '(11) 97777-7777',
    birthDate: '1992-12-03',
    address: 'Rua Vergueiro, 500',
    loyaltyPoints: 220,
    registrationDate: '2024-02-10'
  },
  {
    id: 'cli4',
    name: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    phone: '(11) 96666-6666',
    birthDate: '1988-07-18',
    address: 'Alameda Santos, 2000',
    loyaltyPoints: 65,
    registrationDate: '2024-04-05'
  }
];

export const PURCHASE_HISTORY: PurchaseHistory[] = [
  {
    id: 'hist1',
    clientId: 'cli1',
    serviceId: 'proc1',
    amount: 150.00,
    date: '2024-07-15',
    type: 'service'
  },
  {
    id: 'hist2',
    clientId: 'cli1',
    productId: 'p1',
    amount: 299.90,
    date: '2024-07-15',
    type: 'product'
  },
  {
    id: 'hist3',
    clientId: 'cli2',
    serviceId: 'proc2',
    amount: 120.00,
    date: '2024-07-10',
    type: 'service'
  },
  {
    id: 'hist4',
    clientId: 'cli3',
    productId: 'p3',
    amount: 249.00,
    date: '2024-07-05',
    type: 'product'
  },
  {
    id: 'hist5',
    clientId: 'cli4',
    serviceId: 'proc3',
    amount: 80.00,
    date: '2024-07-01',
    type: 'service'
  }
];
