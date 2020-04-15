function setHealthHUD(health) {
  $('#healthbar .health').css('width', `${Math.round((health/world.player.maxHealth)*100)}%`)
}