// semaphore.js

class Semaphore {
  constructor() {
    this.isLocked = false;
  }

  async acquire() {
    while (this.isLocked) {
      // Espera hasta que el semáforo esté desbloqueado
      await new Promise((resolve) => setTimeout(resolve, 1)); // Puedes ajustar el tiempo de espera según tus necesidades
    }
    this.isLocked = true;
  }

  release() {
    this.isLocked = false;
  }
}

module.exports = Semaphore;
