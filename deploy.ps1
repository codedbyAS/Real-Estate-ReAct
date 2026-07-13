$ErrorActionPreference = 'Stop'
$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectDir

Write-Host 'Building app...'
npm run build

$bucket = Read-Host 'Enter your S3 bucket name'
$region = Read-Host 'Enter your AWS region (e.g. us-east-1)'

if (-not $env:AWS_ACCESS_KEY_ID -or -not $env:AWS_SECRET_ACCESS_KEY) {
  Write-Host 'AWS credentials not found in environment variables.'
  Write-Host 'Please configure AWS CLI or export AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.'
  exit 1
}

aws s3 sync dist/ "s3://$bucket" --delete --region $region
Write-Host "Deployment completed."
