<?php
include "scode/header.php";
?>
<?php
    if(isset($_SESSION['email'])){
        ?>
        <main>
            <h1>Hello <?php echo $_SESSION['fname'] . ' ' . $_SESSION['lname']?></h1>
            <p>Your Email is: <?php echo $_SESSION['email']?></p>
        </main>
        <?php
    }else{
        ?>
        <main class="reg">
            <section>

            </section>
            <form method="post">
                <h1>Sign Up</h1>
                <span class="input">
                    <input type="email" name="email" id="email">
                    <label for="email">Email</label>
                </span>
                <span class="input">
                    <input type="text" name="fname" id="fname">
                    <label for="fname">First Name</label>
                </span>
                <span class="input">
                    <input type="text" name="lname" id="lname">
                    <label for="lname">Last Name</label>
                </span>
                <span class="input">
                    <input type="password" name="psw" id="psw">
                    <label for="psw">Password</label>
                </span>
                <span class="input">
                    <input type="password" name="cpsw" id="cpsw">
                    <label for="cpsw">Confirm Password</label>
                </span>
                <div class="button">
                    <button type="submit" name="signup">Sign Up</button>
                    <span class="login">Login</span>
                </div>
            </form>
        </main>
        <?php
    }
?>
<?php
include "scode/footer.php";