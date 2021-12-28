import { RouteRecordRaw } from 'vue-router'
import { IBreadCrumb } from '@/base-ui/breadcrumb'

let firstMenu: any = null

// 1、用户菜单转化为每个用户的路由
export function menusToRoutes(menus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1、拿到所有的路由对象
  const allRoutes: RouteRecordRaw[] = []
  const routesPath = require.context('../router/main', true, /\.ts/)
  routesPath.keys().forEach((item) => {
    const route = require('../router/main' + item.split('.')[1])
    allRoutes.push(route.default)
  })
  // 2、根据用户菜单映射对应的路由对象
  const mapMenuToRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)

          if (!firstMenu) {
            // route是每个人一定有的
            firstMenu = route // 从跟路劲默认跳转第一个菜单进入首页
          }
        }
        // if (!firstMenu) {
        //   firstMenu = menu
        // }
      } else if (menu.type === 1) {
        mapMenuToRoute(menu.children)
      }
    }
  }

  mapMenuToRoute(menus)

  return routes
}

// 3、获取面包屑数据
export function pathMapToBreadCrumb(userMenus: any[], currentPath: string) {
  const braedCrumbArray: IBreadCrumb[] = []

  pathMapToMenu(userMenus, currentPath, braedCrumbArray)

  return braedCrumbArray
}

// 2、页面刷新后菜单对应保持
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  braedCrumbArray?: IBreadCrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const finallyMenu = pathMapToMenu(menu.children, currentPath)
      if (finallyMenu) {
        braedCrumbArray?.push({ name: menu.name, path: menu.url })
        braedCrumbArray?.push({ name: finallyMenu.name, path: finallyMenu.url })
        return finallyMenu
      }
    } else if (menu.type === 2) {
      if (menu.url === currentPath) {
        return menu
      }
    }
  }
}

// 4、获取按钮权限
export function mapMenusToPerssions(userMenus: any[]) {
  const permissions: any[] = []

  function deepGetPerssion(menus: any[]) {
    for (const item of menus) {
      if (item.type === 1 || item.type === 2) {
        deepGetPerssion(item.children ?? [])
      } else if (item.type === 3) {
        permissions.push(item.permission)
      }
    }
  }
  deepGetPerssion(userMenus)
  return permissions
}

// 5、角色权限映射到eltree
export function mapRoleToTree(menuList: any[]) {
  const leafKeys: number[] = []

  function getLeafKeys(menuList: any[]) {
    for (const item of menuList) {
      if (item.children) {
        getLeafKeys(item.children)
      } else {
        leafKeys.push(item.id)
      }
    }
  }
  getLeafKeys(menuList)
  return leafKeys
}

// // 3、获取面包屑数据
// export function pathMapToBreadCrumb(userMenus: any[], currentPath: string) {
//   const braedCrumbArray: IBreadCrumb[] = []

//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const finallyMenu = pathMapToMenu(menu.children, currentPath)
//       if (finallyMenu) {
//         braedCrumbArray.push({ name: menu.name, path: menu.url })
//         braedCrumbArray.push({ name: finallyMenu.name, path: finallyMenu.url })
//       }
//     } else if (menu.type === 2) {
//       if (menu.url === currentPath) {
//         return menu
//       }
//     }
//   }

//   return braedCrumbArray
// }

// // 2、页面刷新后菜单对应保持
// export function pathMapToMenu(userMenus: any[], currentPath: string): any {
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const finallyMenu = pathMapToMenu(menu.children, currentPath)
//       if (finallyMenu) return finallyMenu
//     } else if (menu.type === 2) {
//       if (menu.url === currentPath) {
//         return menu
//       }
//     }
//   }
// }

export { firstMenu }
