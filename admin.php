<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <![endif]-->
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Admin Panel</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/admin.css">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <main>
            <div class="container">
                <div class="forms">
                    <h1>Add posts</h1>
                    <br>
                    <div class="form-container">
                        <form class="postform">
                            <input class="title" placeholder="Title">
                            <textarea class="content" placeholder="Content"></textarea>
                            <input class="submit" type="submit" value="submit">
                        </form>
                    </div>
                </div>
                <div class="post-list">
                    <h2>posts</h2>
                    <?php include_once('scripts/connection.php'); ?>
                                <?php
                                $sql = 'SELECT * from posts;';
                                $result = mysqli_query($connection, $sql);
                                $resultCheck = mysqli_num_rows($result);
                                
                                if($resultCheck > 0){
                                    while($row = mysqli_fetch_assoc($result)) {
                                        echo '<a class="post"><h3>' . $row['title'] . '</h3><time>' . $row['time'] . '</time></a>';
                                    }
                                }                                
                                ?>
                </div>
            </div>
        </main>
    </body>
</html>