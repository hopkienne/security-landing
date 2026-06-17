$ErrorActionPreference = 'Stop'

$root = 'D:\Personal_Folder\security-landing'
$runDir = Join-Path $root '.agents\runs\secureops-post-hero-redesign\logs'
$out = Join-Path $runDir 'next-start.out.log'
$err = Join-Path $runDir 'next-start.err.log'

$psi = [System.Diagnostics.ProcessStartInfo]::new()
$psi.FileName = 'cmd.exe'
$psi.Arguments = '/c .agents\runs\secureops-post-hero-redesign\logs\start-next.cmd > .agents\runs\secureops-post-hero-redesign\logs\next-start.out.log 2> .agents\runs\secureops-post-hero-redesign\logs\next-start.err.log'
$psi.WorkingDirectory = $root
$psi.UseShellExecute = $false
$psi.CreateNoWindow = $true

$seen = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$psi.EnvironmentVariables.Clear()
foreach ($key in [Environment]::GetEnvironmentVariables().Keys) {
  if ($seen.Add([string] $key)) {
    $psi.EnvironmentVariables[[string] $key] = [string] [Environment]::GetEnvironmentVariable([string] $key)
  }
}

$process = [System.Diagnostics.Process]::new()
$process.StartInfo = $psi
$null = $process.Start()

$process.Id
