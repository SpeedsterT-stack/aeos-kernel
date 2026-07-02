- name: Run kernel
  run: node kernel-runner.js
  env:
    BASE44_APP_ID: ${{ secrets.BASE44_APP_ID }}
    BASE44_API_KEY: ${{ secrets.BASE44_API_KEY }}
