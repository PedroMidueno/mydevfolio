<template>
  <div>
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    <nui-button to="/example">
      Ir al ejemplo
    </nui-button>
  </div>
</template>
