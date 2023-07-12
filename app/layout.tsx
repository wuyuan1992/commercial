"use client"

import "@/styles/globals.css"
import { useCallback, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useWatchTheme } from "@/context/theme"
import { cn } from "@/utils/cls"
import { IconHome, IconSearch, IconStar, IconUser } from "@douyinfe/semi-icons"
import { Button, Divider, IconButton, Input, Modal } from "@douyinfe/semi-ui"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import ThemeToggle from "@/components/ThemeToggle"

const queryClient = new QueryClient()

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  useWatchTheme()

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("flex min-h-screen flex-col antialiased")}>
          <QueryClientProvider client={queryClient}>
            <SearchBar />
            <NavBar />
            <Logo />
            <main
              style={{ background: "var(--semi-color-bg-3)" }}
              className="overflow-x:hidden h-full min-h-screen w-full overflow-y-auto px-4 py-20 sm:py-4 sm:pl-20 sm:pr-4"
            >
              {children}
            </main>
          </QueryClientProvider>
        </body>
      </html>
    </>
  )
}

function Logo() {
  const router = useRouter()
  const goHome = useCallback(() => {
    router.push("/")
  }, [router])

  return (
    <div className="fixed left-4 top-4 z-20 flex h-8 w-8 flex-col items-center justify-center sm:fixed">
      <Button className="w-8" onClick={goHome} theme="solid">
        W
      </Button>
      <div className="hidden w-4 sm:mt-[10px]  sm:inline-block">
        <Divider layout="horizontal" />
      </div>
    </div>
  )
}

function NavBar() {
  const router = useRouter()
  const pathname = usePathname()

  const goHome = useCallback(() => {
    router.push("/")
  }, [router])

  const goToFavorite = useCallback(() => {
    router.push("/movie/favorite")
  }, [router])

  const goToUserProfile = useCallback(() => {
    router.push("/user")
  }, [router])

  const [showSearchModal, setShowSearchModal] = useState(false)

  const { homeActive, favoriteActive, userActive, searchActive } =
    useMemo(() => {
      return {
        homeActive: pathname === "/",
        favoriteActive: pathname === "/movie/favorite",
        userActive: pathname === "/user",
        searchActive: pathname === "/movie/search",
      }
    }, [pathname])

  return (
    <div
      style={{
        background: "var(--semi-color-bg-2)",
      }}
      className="top-none fixed bottom-0 left-0 z-20 flex h-16 w-full flex-row items-center justify-evenly p-4 shadow-md sm:left-0 sm:top-0 sm:h-full sm:w-16 sm:flex-col sm:justify-start sm:gap-4 sm:pt-16"
    >
      <IconButton
        size="small"
        theme="borderless"
        icon={<IconHome className={cn({ "text-color-primary": homeActive })} />}
        onClick={goHome}
      />
      <div className="hidden sm:inline-block">
        <IconButton
          size="small"
          theme="borderless"
          onClick={() => setShowSearchModal(true)}
          icon={
            <IconSearch
              className={cn({ "text-color-primary": searchActive })}
            />
          }
        />
      </div>
      <IconButton
        size="small"
        theme="borderless"
        icon={
          <IconStar className={cn({ "text-color-primary": favoriteActive })} />
        }
        onClick={goToFavorite}
      />

      <div
        style={{ marginTop: "auto" }}
        className="fixed right-4 top-4 z-20 sm:static"
      >
        <ThemeToggle />
      </div>
      <IconButton
        size="small"
        theme="borderless"
        icon={<IconUser className={cn({ "text-color-primary": userActive })} />}
        onClick={goToUserProfile}
      />

      <SearchModal
        open={showSearchModal}
        onCancel={() => setShowSearchModal(false)}
      />
    </div>
  )
}

function SearchBar() {
  return (
    <div
      className="fixed left-0 top-0 z-10 flex h-16 w-full items-center justify-center px-16 sm:hidden"
      style={{
        background: "var(--semi-color-bg-4)",
      }}
    >
      <SearchProduct />
    </div>
  )
}

function SearchModal({
  open,
  onCancel,
}: {
  open: boolean
  onCancel: () => void
}) {
  return (
    <Modal
      visible={open}
      onCancel={onCancel}
      width={500}
      footer={null}
      closable={false}
      maskClosable
      mask={false}
    >
      <SearchProduct onSearchEnd={onCancel} />
    </Modal>
  )
}

function SearchProduct({ onSearchEnd }: { onSearchEnd: () => void }) {
  return <Input placehodler="Search Product" />
}
