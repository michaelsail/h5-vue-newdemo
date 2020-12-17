const gate = '//doctorgate.91160.com'

let cube = ''
let doctorBus = ''
let commerce = ''

if (process.env.NODE_ENV == 'development') {
  cube = '/cube-data'
  doctorBus = '/doctor_business'
  commerce = '/commerce'
}

if (process.env.NODE_ENV == 'test') {
  cube = gate + '/cube-data'
  doctorBus = gate + '/doctor_business'
  commerce = gate + '/commerce'
}

if (process.env.NODE_ENV == 'production') {
  cube = gate + '/cube-data'
  doctorBus = gate + '/doctor_business'
  commerce = gate + '/commerce'
}

export {
  gate,
  cube,
  doctorBus,
  commerce
}
