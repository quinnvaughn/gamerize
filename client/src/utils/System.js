export const mapSystem = system => {
  switch (system) {
    case 'PC':
      return 'pc'
    case 'XBOX_ONE':
      return 'xbl'
    case 'PS4':
      return 'psn'
    case 'NINTENDO_SWITCH':
      return 'nso'
    default:
      return 'Not a system'
  }
}

export const mapLauncher = launcher => {
  return launcher.toLowerCase()
}
