/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TagsImport } from './routes/tags'
import { Route as ProjectsImport } from './routes/projects'
import { Route as DetailImport } from './routes/detail'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const TagsRoute = TagsImport.update({
  path: '/tags',
  getParentRoute: () => rootRoute,
} as any)

const ProjectsRoute = ProjectsImport.update({
  path: '/projects',
  getParentRoute: () => rootRoute,
} as any)

const DetailRoute = DetailImport.update({
  path: '/detail',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/detail': {
      preLoaderRoute: typeof DetailImport
      parentRoute: typeof rootRoute
    }
    '/projects': {
      preLoaderRoute: typeof ProjectsImport
      parentRoute: typeof rootRoute
    }
    '/tags': {
      preLoaderRoute: typeof TagsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  DetailRoute,
  ProjectsRoute,
  TagsRoute,
])

/* prettier-ignore-end */
