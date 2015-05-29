@echo off

set sevenzip="C:\Program Files\7-Zip\7z"
if not defined sevenzip (
	echo cannot find 7z
	goto :end
)

cmd /c "%sevenzip% x test.zip -p%1" < temp
if errorlevel 1 (
	echo cannot open archive.
)
echo archive was opened.

:end