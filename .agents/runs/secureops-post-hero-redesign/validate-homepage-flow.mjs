import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const pagePath = path.join(root, 'src/app/(frontend)/page.tsx')
const page = fs.readFileSync(pagePath, 'utf8')

const assertions = []

function assert(name, condition) {
  assertions.push({ name, condition })
}

const expectedOrder = [
  '<Hero />',
  '<DefeatCyberattacks />',
  '<ProofBand />',
  '<AdvantageSection />',
  '<FocusSection />',
]

let lastIndex = -1
for (const marker of expectedOrder) {
  const index = page.indexOf(marker)
  assert(`page contains ${marker}`, index !== -1)
  assert(`${marker} appears after previous homepage section`, index > lastIndex)
  lastIndex = index
}

const productsIndex = page.indexOf('{/* Products */}')
assert('Products section remains after FocusSection', productsIndex > lastIndex)

assert('LogoMarquee is not rendered after Hero', !page.includes('<LogoMarquee />'))
assert('ValueProps is not rendered after Hero', !page.includes('<ValueProps />'))
assert('inline StatsBand is removed', !page.includes('<StatsBand />') && !page.includes('function StatsBand'))

for (const file of ['DefeatCyberattacks.tsx', 'ProofBand.tsx', 'AdvantageSection.tsx']) {
  assert(
    `${file} exists`,
    fs.existsSync(path.join(root, 'src/components/sections', file)),
  )
}

const failures = assertions.filter((item) => !item.condition)

if (failures.length > 0) {
  console.error('Homepage flow validation failed:')
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log('Homepage flow validation passed.')
