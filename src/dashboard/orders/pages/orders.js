export const tdList = [
  {
    id: "123abc",
    rush: true,
    cadNumber: "123465",
    name: "Rink Crisjon",
    createdAt: '2022-02-21',
    clientJobName:  "Something",
    service: "polishing",
    description: 'Something description',
    status: "first",
    item: 'ring',
    dueDate: '2022-03-21',
    done: true,
    paymentDate: "",
    deliveredDate: "2022-03-21",
    payment_type: 'check',
    checkNumber: 4456,
    delivered: true,
    final_price: 5000,
    price: "$450.00",
    client: "Alejor"
  },
  {
    id: "123abc2",
    rush: true,
    cadNumber: "1234656",
    name: "Manilla",
    createdAt: new Date().toISOString().split('T')[0],
    clientJobName:  "Something",
    service: "polishing",
    description: 'Something description',
    status: "first",
    item: 'ring',
    dueDate: new Date().toISOString().split('T')[0],
    done: false,
    paymentDate: "",
    payment_type: 'cash',
    checkNumber: 0,
    delivered: true,
    final_price: 5000,
    price: "$50.30",
    client: "Erika"
  },
  {
    id: "123abc3",
    rush: true,
    cadNumber: "1234658",
    name: "Neck",
    createdAt: new Date().toISOString().split('T')[0],
    clientJobName:  "Something",
    service: "polishing",
    description: 'Something description',
    status: "first",
    item: 'ring',
    dueDate: new Date().toISOString().split('T')[0],
    done: false,
    paymentDate: new Date().toISOString().split('T')[0],
    payment_type: 'cash',
    checkNumber: 0,
    delivered: false,
    final_price: 5000,
    price: "$0.00",
    client: "Alejor"
  },
]