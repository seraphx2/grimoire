$www  = 'Z:\grimoire\config\www'
$old = $www+'_old'
$build = (Get-Location).path+'\build\*'

if (Test-Path -Path $old) {
  Remove-Item -Path $old -Recurse
}

Rename-Item -Path $www -NewName "www_old"
New-Item -Path $www -ItemType Directory
Copy-Item -Path $build -Destination $www -Recurse
