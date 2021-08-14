<template>
  <div class="bugs row w-100 m-0">
    <div class="col-md-12 p-4">
      <div class="row m-0 w-100 d-flex justify-content-between">
        <div class="col-md-3 p-0">
          <h3>Bugs</h3>
        </div>
        <div class="col-md-3 p-0 d-flex align-items-center justify-content-end">
          <button class="btn btn-success">
            <h6>Report</h6>
          </button>
        </div>
        <div class="col-md-12 p-3">
          <div class="row w-100 m-0 mt-2 d-flex justify-content-between align-items-center">
            <div class="col-md-3 p-0 d-flex align-items-center ">
              <h5>Title</h5>
            </div>
            <div class="col-md-3 p-0 d-flex align-items-center ">
              <h5>Reported By</h5>
            </div>
            <div class="col-md-3 p-0 d-flex align-items-center ">
              <div class="row m-0 w-100 d-flex align-items-center">
                <h5 class="col-md-6 p-0">
                  Status
                </h5>
                <button class=" col-md-2 p-0 btn btn-outline-info">
                  <i class="fas fa-sort-down"></i>
                </button>
              </div>
            </div>
            <div class="col-md-3 p-0 d-flex align-items-center ">
              <div class="row m-0 w-100 d-flex align-items-center">
                <h5 class="col-md-9 p-0">
                  Last Modified
                </h5>
                <button class=" col-md-2 p-0 btn btn-outline-info">
                  <i class="fas fa-sort-down"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="row m-0 w-100 d-flex justify-content-between">
            <BugsCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BugsPage'
}
</script>
