<template>
  <div *ngIf="isLoading">
    <spinner></spinner>
  </div>
  <div *ngIf="!isLoading">
    <!-- Your existing content goes here -->
  </div>
</template>

<script>
export class AppComponent {
  isLoading = true;

  ngOnInit() {
    // Simulate data loading
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
</script>
