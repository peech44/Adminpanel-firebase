<?
session_start();
$hostname="admin";
$password="1717";
if($txtUsername==$hostname)&&($txtPassword==$password){
  session_register("txtUsername");
  session_register("txtPassword");
  header("location:index.html");
}else {
  header("location:login.html");
}
?>
