<%
Dim fname, lname
fname = Request.Form("fname")
lname = Request.Form("lname")
Response.Write("Hola " & fname & " " & lname)
%>
