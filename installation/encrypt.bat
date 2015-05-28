@echo off

set sevenzip="C:\Program Files\7-Zip\7z"

cmd /c "del temp"
cmd /c "fsutil file createnew temp 0"
cmd /c "uuid v4" > temp
cmd /c "%sevenzip% a test.zip *.json -p%1" < temp
if errorlevel 1 (
	echo cannot create archive.
	goto :end
)
echo archive was created.

:end