const bcrypt = require('bcryptjs')

const plainPassword = '123123abc'
const hashedPasswordFromDb =
  '$2a$10$OmfYG4e2lP/UWiyx7OnP0.RSFaYRkDjDXF0PXKTItb9usTuOLviQu'

async function checkPassword () {
  const isMatch = await bcrypt.compare(plainPassword, hashedPasswordFromDb)
  console.log('Password match:', isMatch)
}

checkPassword()
