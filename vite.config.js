import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const isUserOrOrgSite = repoName.endsWith('.github.io')
const base = process.env.GITHUB_ACTIONS
  ? (isUserOrOrgSite ? '/' : `/${repoName}/`)
  : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
